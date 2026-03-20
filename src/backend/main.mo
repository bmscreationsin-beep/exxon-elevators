import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";

actor {
  type Inquiry = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Int;
  };

  module Inquiry {
    public func compare(a : Inquiry, b : Inquiry) : Order.Order {
      Nat.compare(a.id, b.id);
    };

    public func compareByTimestamp(a : Inquiry, b : Inquiry) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };

    public func compareByName(a : Inquiry, b : Inquiry) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  let inquiries = Map.empty<Nat, Inquiry>();
  var nextId = 0;

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, phone : Text, message : Text) : async () {
    let id = nextId;
    let inquiry : Inquiry = {
      id;
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };
    inquiries.add(id, inquiry);
    nextId += 1;
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    let iter = inquiries.values();
    iter.toArray().sort();
  };

  public query ({ caller }) func getInquiriesByTimestamp() : async [Inquiry] {
    let iter = inquiries.values();
    iter.toArray().sort(Inquiry.compareByTimestamp);
  };

  public query ({ caller }) func getInquiriesByName() : async [Inquiry] {
    let iter = inquiries.values();
    iter.toArray().sort(Inquiry.compareByName);
  };

  public query ({ caller }) func getInquiry(id : Nat) : async Inquiry {
    switch (inquiries.get(id)) {
      case (null) { Runtime.trap("Inquiry does not exist") };
      case (?inquiry) { inquiry };
    };
  };
};
