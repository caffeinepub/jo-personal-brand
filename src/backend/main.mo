import Array "mo:core/Array";
import Int "mo:core/Int";
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

  // V1 type kept for stable compatibility during migration
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

  stable var nextPostId = 1;
  stable var nextLeadId = 1;
  stable var nextTestimonialId = 1;
  // Keep this stable var so the compiler doesn't complain about discarding it
  stable var migratedTestimonials = true;

  stable var _postsSnap : [(Nat, Post)] = [];
  stable var _leadsSnap : [(Nat, Lead)] = [];
  stable var _testimonialsSnap : [(Nat, Testimonial)] = [];

  let posts = Map.empty<Nat, Post>();
  let leads = Map.empty<Nat, Lead>();
  // Keep V1 map stable variable name so compiler sees it as compatible
  let testimonials = Map.empty<Nat, TestimonialV1>();
  let testimonialsV2 = Map.empty<Nat, Testimonial>();

  system func preupgrade() {
    _postsSnap := posts.entries().toArray();
    _leadsSnap := leads.entries().toArray();
    _testimonialsSnap := testimonialsV2.entries().toArray();
  };

  system func postupgrade() {
    for ((k, v) in _postsSnap.vals()) posts.add(k, v);
    for ((k, v) in _leadsSnap.vals()) leads.add(k, v);
    for ((k, v) in _testimonialsSnap.vals()) testimonialsV2.add(k, v);
    _postsSnap := [];
    _leadsSnap := [];
    _testimonialsSnap := [];
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
    let t : Testimonial = {
      id = nextTestimonialId;
      clientName;
      clientTitle;
      photoUrl;
      reviewText;
      rating;
      createdAt = Time.now();
    };
    testimonialsV2.add(nextTestimonialId, t);
    nextTestimonialId += 1;
    t.id;
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
