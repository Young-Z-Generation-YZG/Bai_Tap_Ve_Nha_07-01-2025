class Category {
  final String id;
  final String categoryName;
  final String categorySlug;

  Category({
    required this.id,
    required this.categoryName,
    required this.categorySlug,
  });

  static Category fromJson(Map<String, dynamic> json) {
    return Category(
      id: json['_id'],
      categoryName: json['category_name'],
      categorySlug: json['category_slug'],
    );
  }
}
