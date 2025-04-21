import 'package:admin_flutter/domain/common/address.dart';

class User {
  String id;
  String email;
  bool verified;
  String firstName;
  String lastName;
  String phoneNumber;
  String avatar;
  Address address;
  DateTime createdAt;
  DateTime updatedAt;
  List<String> roles;

  User({
    required this.id,
    required this.email,
    required this.verified,
    required this.firstName,
    required this.lastName,
    required this.phoneNumber,
    required this.avatar,
    required this.address,
    required this.createdAt,
    required this.updatedAt,
    required this.roles,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['_id'] ?? '',
      email: json['email'] ?? '',
      verified: json['verified'] ?? false,
      firstName: json['first_name'] ?? '',
      lastName: json['last_name'] ?? '',
      phoneNumber: json['phone_number'] ?? '',
      avatar: json['avatar'] ?? '',
      address:
          json['address'] != null
              ? Address.fromJson(json['address'])
              : Address.empty(),
      roles: json['roles'] != null ? List<String>.from(json['roles']) : [],
      createdAt:
          json['createdAt'] != null
              ? DateTime.parse(json['createdAt'])
              : DateTime.now(),
      updatedAt:
          json['updatedAt'] != null
              ? DateTime.parse(json['updatedAt'])
              : DateTime.now(),
    );
  }
}
