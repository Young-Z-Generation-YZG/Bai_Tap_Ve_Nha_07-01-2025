import 'package:admin_flutter/domain/category.dart';
import 'package:admin_flutter/domain/common/average_rating.dart';
import 'package:admin_flutter/domain/common/product_image.dart';
import 'package:admin_flutter/domain/common/rating_star.dart';

abstract class ProductInterface {
  String get id;
  String get productCode;
  String get productName;
  String get productDescription;
  List<String> get productSizes;
  List<String> get productColors;
  num get productStocks;
  List<ProductImage> get productImgs;
  Category get productCategory;
  String get productType;
  String get productGender;
  String get productBrand;
  num get productPrice;
  String get productStatus;
  String get productSlug;
  AverageRating get averageRating;
  List<RatingStar> get ratingStars;
}

class Product implements ProductInterface {
  final String id;
  final String productCode;
  final String productName;
  final String productDescription;
  final List<String> productSizes;
  final List<String> productColors;
  final num productStocks;
  final List<ProductImage> productImgs;
  final Category productCategory;
  final String productType;
  final String productGender;
  final String productBrand;
  final num productPrice;
  final String productStatus;
  final String productSlug;
  final AverageRating averageRating;
  final List<RatingStar> ratingStars;

  Product({
    required this.id,
    required this.productCode,
    required this.productName,
    required this.productDescription,
    required this.productSizes,
    required this.productColors,
    required this.productStocks,
    required this.productImgs,
    required this.productCategory,
    required this.productType,
    required this.productGender,
    required this.productBrand,
    required this.productPrice,
    required this.productStatus,
    required this.productSlug,
    required this.averageRating,
    required this.ratingStars,
  });

  Product copyWith({
    String? id,
    String? productCode,
    String? productName,
    String? productDescription,
    List<String>? productSizes,
    List<String>? productColors,
    num? productStocks,
    List<ProductImage>? productImgs,
    Category? productCategory,
    String? productType,
    String? productGender,
    String? productBrand,
    num? productPrice,
    String? productStatus,
    String? productSlug,
    AverageRating? averageRating,
    List<RatingStar>? ratingStars,
  }) {
    return Product(
      id: id ?? this.id,
      productCode: productCode ?? this.productCode,
      productName: productName ?? this.productName,
      productDescription: productDescription ?? this.productDescription,
      productSizes: productSizes ?? this.productSizes,
      productColors: productColors ?? this.productColors,
      productStocks: productStocks ?? this.productStocks,
      productImgs: productImgs ?? this.productImgs,
      productCategory: productCategory ?? this.productCategory,
      productType: productType ?? this.productType,
      productGender: productGender ?? this.productGender,
      productBrand: productBrand ?? this.productBrand,
      productPrice: productPrice ?? this.productPrice,
      productStatus: productStatus ?? this.productStatus,
      productSlug: productSlug ?? this.productSlug,
      averageRating: averageRating ?? this.averageRating,
      ratingStars: ratingStars ?? this.ratingStars,
    );
  }
}
