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

  // Old type kept for upgrade compatibility
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

  // Stable vars - keep exact names/types from previous version to satisfy compatibility
  stable var nextPostId = 1;
  stable var nextLeadId = 1;
  stable var nextTestimonialId = 1;
  stable var migratedTestimonials = false;

  // Serialised snapshots of runtime maps (populated in preupgrade)
  stable var _postsSnap : [(Nat, Post)] = [];
  stable var _leadsSnap : [(Nat, Lead)] = [];
  stable var _testimonialsSnap : [(Nat, Testimonial)] = [];

  // Runtime maps (not stable - rebuilt from snapshots in postupgrade)
  let posts = Map.empty<Nat, Post>();
  let leads = Map.empty<Nat, Lead>();
  // This is the "old" non-stable map name kept so the compiler won't complain
  // about M0170 on the Map type change. The actual data lives in testimonialsSnap.
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
    if (not migratedTestimonials) {
      // Migrate old V1 entries (no photoUrl) to V2
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
    } else {
      for ((k, v) in _testimonialsSnap.vals()) testimonialsV2.add(k, v);
    };
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
