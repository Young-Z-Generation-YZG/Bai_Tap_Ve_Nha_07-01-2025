class RatingStar {
  final num star;
  final num starCount;

  RatingStar({required this.star, required this.starCount});

  static RatingStar fromJson(Map<String, dynamic> json) {
    return RatingStar(star: json['star'], starCount: json['star_count']);
  }
}
