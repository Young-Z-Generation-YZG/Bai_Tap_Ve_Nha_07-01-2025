import 'package:admin_flutter/domain/product.dart';
import 'package:admin_flutter/pages/dashboards/products/product-details-v2.page.dart';
import 'package:admin_flutter/widgets/card-wrapper.widget.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

Widget productCard(BuildContext context, Product product) {
  double _deviceWidth = MediaQuery.of(context).size.width;
  double _deviceHeight = MediaQuery.of(context).size.height;

  final String displayDefaultImage = product.productImgs[0].secureUrl;

  return GestureDetector(
    onTap: () {
      Navigator.push(
        context,
        CupertinoPageRoute(
          builder: (context) => ProductDetailsV2Page(product: product),
        ),
      );
    },
    child: Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: CardWrapper(
        width: _deviceWidth! * 0.9,
        height: _deviceHeight! * 0.2,
        backgroundColor: Colors.white,
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Row(
            children: [
              Container(
                width: 100,
                height: 120,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  image: DecorationImage(
                    image: NetworkImage(displayDefaultImage),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            product.productName,
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                            ),
                            // overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 4),
                    Text(
                      "${product.productCategory.categoryName} • ${product.productBrand} • ${product.productColors[0]}",
                      style: TextStyle(fontSize: 13, color: Colors.grey),
                    ),
                    SizedBox(height: 6),
                    Row(
                      children: [
                        Icon(
                          CupertinoIcons.star_fill,
                          size: 14,
                          color: Colors.amber,
                        ),
                        SizedBox(width: 4),
                        Text(
                          "${product.averageRating.averageValue} (${product.averageRating.ratingCount})",
                          style: TextStyle(
                            fontSize: 13,
                            color: Colors.grey[700],
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 8),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          "\$${product.productPrice}",
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w700,
                            color: Color(0xFF9747FF),
                          ),
                        ),
                        _statusTag(product.productStatus),
                      ],
                    ),
                    SizedBox(height: 6),
                    Row(
                      children: [
                        Text(
                          "Sizes: ",
                          style: TextStyle(
                            fontSize: 12,
                            color: Colors.grey[700],
                          ),
                        ),
                        SizedBox(width: 4),
                        ...(product.productSizes)
                            .map(
                              (size) => Container(
                                margin: EdgeInsets.only(right: 4),
                                padding: EdgeInsets.symmetric(
                                  horizontal: 6,
                                  vertical: 2,
                                ),
                                decoration: BoxDecoration(
                                  color: Colors.grey[200],
                                  borderRadius: BorderRadius.circular(4),
                                ),
                                child: Text(
                                  size,
                                  style: TextStyle(
                                    fontSize: 11,
                                    color: Colors.black87,
                                  ),
                                ),
                              ),
                            )
                            .toList(),
                        Spacer(),
                        Container(
                          padding: EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: Color(0xFFEEE5FF),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text(
                            'Stock: ${product.productStocks}',
                            style: TextStyle(
                              fontSize: 12,
                              color: Color(0xFF9747FF),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    ),
  );
}

Widget _statusTag(String status) {
  Color tagColor;
  switch (status) {
    case 'PUBLISHED':
      tagColor = Colors.green;
      break;
    case 'SALE':
      tagColor = Colors.orange;
      break;
    case 'OUT_OF_STOCK':
      tagColor = Colors.red;
      break;
    default:
      tagColor = Colors.blue;
  }

  return Container(
    padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
    decoration: BoxDecoration(
      color: tagColor.withOpacity(0.1),
      borderRadius: BorderRadius.circular(6),
    ),
    child: Text(
      status,
      style: TextStyle(
        fontSize: 12,
        color: tagColor,
        fontWeight: FontWeight.bold,
      ),
    ),
  );
}
