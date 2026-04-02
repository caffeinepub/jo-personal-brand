import Array "mo:core/Array";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";

actor {
  public type Post = {
    id : Nat;
    title : Text;
    content : Text;
    category : Text;
    excerpt : Text;
    createdAt : Int;
  };

  public type Lead = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  // This type MUST match the previously deployed stable type exactly
  // so the upgrade is compatible.
  type TestimonialV1 = {
    id : Nat;
    clientName : Text;
    clientTitle : Text;
    reviewText : Text;
    rating : Nat;
    createdAt : Int;
  };

  public type Testimonial = {
    id : Nat;
    clientName : Text;
    clientTitle : Text;
    photoUrl : Text;
    reviewText : Text;
    rating : Nat;
    createdAt : Int;
  };

  let posts = Map.empty<Nat, Post>();
  let leads = Map.empty<Nat, Lead>();

  // Keep old stable variable name with old type for compatibility
  let testimonials = Map.empty<Nat, TestimonialV1>();
  // New map with updated type
  let testimonialsV2 = Map.empty<Nat, Testimonial>();
  stable var nextPostId = 1;
  stable var nextLeadId = 1;
  stable var nextTestimonialId = 1;
  stable var migratedTestimonials = false;

  system func postupgrade() {
    if (not migratedTestimonials) {
      for ((k, v) in testimonials.entries()) {
        testimonialsV2.add(k, {
          id = v.id;
          clientName = v.clientName;
          clientTitle = v.clientTitle;
          photoUrl = "";
          reviewText = v.reviewText;
          rating = v.rating;
          createdAt = v.createdAt;
        });
      };
      migratedTestimonials := true;
    };
  };

  public shared ({ caller }) func createPost(title : Text, content : Text, category : Text, excerpt : Text) : async Nat {
    let post : Post = {
      id = nextPostId;
      title;
      content;
      category;
      excerpt;
      createdAt = Time.now();
    };
    posts.add(nextPostId, post);
    nextPostId += 1;
    post.id;
  };

  public query ({ caller }) func getAllPosts() : async [Post] {
    posts.values().toArray().sort(
      func(a, b) {
        Nat.compare(b.id, a.id);
      }
    );
  };

  public query ({ caller }) func getPostById(id : Nat) : async ?Post {
    posts.get(id);
  };

  public shared ({ caller }) func deletePost(id : Nat) : async Bool {
    let existed = posts.containsKey(id);
    posts.remove(id);
    existed;
  };

  public shared ({ caller }) func submitLead(name : Text, email : Text, message : Text) : async Nat {
    let lead : Lead = {
      id = nextLeadId;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    leads.add(nextLeadId, lead);
    nextLeadId += 1;
    lead.id;
  };

  public query ({ caller }) func getAllLeads() : async [Lead] {
    leads.values().toArray().sort(
      func(a, b) {
        Nat.compare(b.id, a.id);
      }
    );
  };

  public shared ({ caller }) func createTestimonial(clientName : Text, clientTitle : Text, photoUrl : Text, reviewText : Text, rating : Nat) : async Nat {
    let testimonial : Testimonial = {
      id = nextTestimonialId;
      clientName;
      clientTitle;
      photoUrl;
      reviewText;
      rating;
      createdAt = Time.now();
    };
    testimonialsV2.add(nextTestimonialId, testimonial);
    nextTestimonialId += 1;
    testimonial.id;
  };

  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    testimonialsV2.values().toArray().sort(
      func(a, b) {
        Int.compare(b.createdAt, a.createdAt);
      }
    );
  };

  public shared ({ caller }) func deleteTestimonial(id : Nat) : async Bool {
    let existed = testimonialsV2.containsKey(id);
    testimonialsV2.remove(id);
    existed;
  };
};
