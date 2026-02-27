import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Migration "migration";

(with migration = Migration.run)
actor {
  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
  };

  type BlogPost = {
    id : Nat;
    title : Text;
    content : Text;
    excerpt : Text;
    category : Text;
    createdAt : Int;
  };

  var messages : [ContactMessage] = [];
  let posts = Map.empty<Nat, BlogPost>();
  var nextPostId = 1;

  // Contact Messages
  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async () {
    let newMessage : ContactMessage = {
      name;
      email;
      message;
    };
    messages := messages.concat([newMessage]);
  };

  public query ({ caller }) func getAllMessages() : async [ContactMessage] {
    messages;
  };

  // Blog Post Functions
  public shared ({ caller }) func createPost(title : Text, content : Text, excerpt : Text, category : Text) : async Nat {
    let post : BlogPost = {
      id = nextPostId;
      title;
      content;
      excerpt;
      category;
      createdAt = Time.now();
    };
    posts.add(nextPostId, post);
    nextPostId += 1;
    post.id;
  };

  public query ({ caller }) func getAllPosts() : async [BlogPost] {
    posts.values().toArray().sort(
      func(a, b) {
        Nat.compare(b.id, a.id);
      }
    );
  };

  public query ({ caller }) func getPostById(id : Nat) : async ?BlogPost {
    posts.get(id);
  };

  public shared ({ caller }) func deletePost(id : Nat) : async Bool {
    let existed = posts.containsKey(id);
    posts.remove(id);
    existed;
  };
};
