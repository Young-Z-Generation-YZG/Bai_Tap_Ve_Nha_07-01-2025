class ProductImage {
  final String publicId;
  final String secureUrl;

  ProductImage({required this.publicId, required this.secureUrl});

  static ProductImage fromJson(Map<String, dynamic> json) {
    return ProductImage(
      publicId: json['public_id'],
      secureUrl: json['secure_url'],
    );
  }
}
