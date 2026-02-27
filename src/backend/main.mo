import Array "mo:core/Array";

actor {
  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
  };

  var messages : [ContactMessage] = [];

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
};
