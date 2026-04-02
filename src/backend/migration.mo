import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type Post = {
    id : Nat;
    title : Text;
    content : Text;
    category : Text;
    excerpt : Text;
    createdAt : Int;
  };

  type Lead = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  type Testimonial = {
    id : Nat;
    clientName : Text;
    clientTitle : Text;
    reviewText : Text;
    rating : Nat;
    createdAt : Int;
  };

  type OldActor = {
    posts : Map.Map<Nat, Post>;
    leads : Map.Map<Nat, Lead>;
    nextPostId : Nat;
    nextLeadId : Nat;
  };

  type NewActor = {
    posts : Map.Map<Nat, Post>;
    leads : Map.Map<Nat, Lead>;
    testimonials : Map.Map<Nat, Testimonial>;
    nextPostId : Nat;
    nextLeadId : Nat;
    nextTestimonialId : Nat;
  };

  // Migration function adds new testimonials feature to existing state
  public func run(old : OldActor) : NewActor {
    {
      posts = old.posts;
      leads = old.leads;
      testimonials = Map.empty<Nat, Testimonial>();
      nextPostId = old.nextPostId;
      nextLeadId = old.nextLeadId;
      nextTestimonialId = 1;
    };
  };
};
