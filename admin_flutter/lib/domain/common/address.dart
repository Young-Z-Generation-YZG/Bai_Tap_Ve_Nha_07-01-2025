class Address {
  String addressLine;
  String district;
  String province;
  String country;

  Address({
    required this.addressLine,
    required this.district,
    required this.province,
    required this.country,
  });

  factory Address.empty() {
    return Address(addressLine: '', district: '', province: '', country: '');
  }

  factory Address.fromJson(Map<String, dynamic> json) {
    return Address(
      addressLine: json['address_line'] ?? '',
      district: json['district'] ?? '',
      province: json['province'] ?? '',
      country: json['country'] ?? '',
    );
  }
}
