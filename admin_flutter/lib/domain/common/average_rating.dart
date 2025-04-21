class AverageRating {
  final num averageValue;
  final num ratingCount;

  AverageRating({required this.averageValue, required this.ratingCount});

  static AverageRating fromJson(Map<String, dynamic> json) {
    return AverageRating(
      averageValue: json['average_value'],
      ratingCount: json['rating_count'],
    );
  }
}
