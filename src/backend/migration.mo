import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
  };

  type OldActor = {
    messages : [ContactMessage];
  };

  type BlogPost = {
    id : Nat;
    title : Text;
    content : Text;
    excerpt : Text;
    category : Text;
    createdAt : Int;
  };

  type NewActor = {
    messages : [ContactMessage];
    posts : Map.Map<Nat, BlogPost>;
    nextPostId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    {
      messages = old.messages;
      posts = Map.empty<Nat, BlogPost>();
      nextPostId = 1;
    };
  };
};
