import 'package:admin_flutter/domain/product.dart';
import 'package:admin_flutter/domain/category.dart';
import 'package:admin_flutter/widgets/form/form-group.widget.dart';
import 'package:admin_flutter/widgets/form/input-field.widget.dart';
import 'package:admin_flutter/widgets/form/selector-field.widget.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ProductDetailsV2Page extends StatefulWidget {
  final Product product;

  const ProductDetailsV2Page({super.key, required this.product});

  @override
  State<StatefulWidget> createState() {
    return _ProductDetailsV2PageState();
  }
}

class _ProductDetailsV2PageState extends State<ProductDetailsV2Page> {
  // Add a page controller for the image carousel
  late final PageController _imagePageController;
  late TextEditingController productNameController;
  late TextEditingController productStockController;
  late TextEditingController productPriceController;
  late Product _product; // Local copy of the product that we can modify
  int _currentImageIndex = 0;
  bool _isEditing = false;

  @override
  void initState() {
    super.initState();
    _product = widget.product; // Initialize local copy
    _imagePageController = PageController();
    productNameController = TextEditingController(text: _product.productName);
    productStockController = TextEditingController(
      text: _product.productStocks.toString(),
    );
    productPriceController = TextEditingController(
      text: _product.productPrice.toStringAsFixed(2),
    );
  }

  @override
  void dispose() {
    _imagePageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Product Details'),
        backgroundColor: CupertinoColors.systemGroupedBackground,
        border: null,
        leading: CupertinoNavigationBarBackButton(
          onPressed: () => Navigator.pop(context),
        ),
        trailing: CupertinoButton(
          padding: EdgeInsets.zero,
          child: Text(
            _isEditing ? 'Save' : 'Edit',
            style: TextStyle(
              color: CupertinoColors.activeBlue,
              fontWeight: FontWeight.w600,
            ),
          ),
          onPressed: () async {
            setState(() {
              _isEditing = !_isEditing;
            });
          },
        ),
      ),
      backgroundColor: CupertinoColors.systemGroupedBackground,
      child: SafeArea(
        child: ListView(
          children: [
            _imageSection(),
            SizedBox(height: 16),
            FormGroup(
              children: [
                InputField(
                  label: "Product name",
                  disabled: !_isEditing,
                  textController: productNameController,
                ),
                SelectorField(
                  key: ValueKey(_product.productCategory.categoryName),
                  label: "Category",
                  disabled: !_isEditing,
                  selectedValue: _product.productCategory.categoryName,
                  options: ["Category 1", "Category 2", "Category 3"],
                  onChanged: (value) {
                    setState(() {
                      // Use the copyWith method to update the local product
                      _product = _product.copyWith(
                        productCategory: Category(
                          id: _product.productCategory.id,
                          categoryName: value,
                          categorySlug: _product.productCategory.categorySlug,
                        ),
                      );
                    });
                  },
                ),
                SelectorField(
                  label: "Brand",
                  disabled: !_isEditing,
                  selectedValue: _product.productBrand,
                  options: ["Brand 1", "Brand 2", "Category 3"],
                  onChanged: (value) {},
                ),
                SelectorField(
                  label: "Colors",
                  disabled: !_isEditing,
                  selectedValue: _product.productColors[0],
                  options: ["YELLOW", "GREEN", "BROWN"],
                  onChanged: (value) {},
                ),
                InputField(
                  label: "Stock available",
                  disabled: true,
                  textController: productStockController,
                ),
                InputField(
                  label: "Price",
                  disabled: !_isEditing,
                  textController: productPriceController,
                ),
                SelectorField(
                  label: "Active",
                  disabled: !_isEditing,
                  selectedValue: _product.productStatus,
                  options: ["PUBLISHED", "INACTIVE"],
                  onChanged: (value) {},
                ),
              ],
            ),
            SizedBox(height: 16),

            _buildSizesSection(),

            SizedBox(height: 16),

            _buildDescription(),
          ],
        ),
      ),
    );
  }

  Widget _imageSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          height: 350,
          decoration: BoxDecoration(
            color: Colors.white,
            boxShadow: [
              BoxShadow(
                color: Colors.black.withAlpha(5),
                blurRadius: 10,
                offset: Offset(0, 5),
              ),
            ],
          ),
          child: PageView.builder(
            controller: _imagePageController,
            itemCount: _product.productImgs.length,
            onPageChanged:
                (index) => {
                  setState(() {
                    _currentImageIndex = index;
                  }),
                },
            itemBuilder: (context, index) {
              return Container(
                // padding: EdgeInsets.all(20),
                child: Image.network(
                  _product.productImgs[index].secureUrl,
                  fit: BoxFit.contain,
                  errorBuilder: (context, error, stackTrace) {
                    return Center(
                      child: Icon(
                        CupertinoIcons.photo,
                        size: 80,
                        color: CupertinoColors.systemGrey,
                      ),
                    );
                  },
                ),
              );
            },
          ),
        ),

        // Image counter
        if (_product.productImgs.length > 1)
          Padding(
            padding: const EdgeInsets.only(top: 8.0, left: 16.0, right: 16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.black.withAlpha(60),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    '${_currentImageIndex + 1}/${_product.productImgs.length}',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),

        if (_product.productImgs.length > 1)
          Container(
            height: 80,
            margin: EdgeInsets.only(top: 12),
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.symmetric(horizontal: 16),
              itemCount: _product.productImgs.length,
              itemBuilder: (context, index) {
                return GestureDetector(
                  onTap: () {
                    _imagePageController.animateToPage(
                      index,
                      duration: Duration(milliseconds: 300),
                      curve: Curves.easeInOut,
                    );

                    setState(() {
                      _currentImageIndex = index;
                    });
                  },
                  child: Container(
                    width: 70,
                    height: 70,
                    margin: EdgeInsets.only(right: 8),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(
                        color:
                            _currentImageIndex == index
                                ? Color(0xFF9747FF)
                                : Colors.transparent,
                        width: 2,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withAlpha(50),
                          blurRadius: 4,
                          offset: Offset(0, 2),
                        ),
                      ],
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(6),
                      child: Image.network(
                        _product.productImgs[index].secureUrl,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) {
                          return Center(
                            child: Icon(
                              CupertinoIcons.photo,
                              color: CupertinoColors.systemGrey,
                            ),
                          );
                        },
                      ),
                    ),
                  ),
                );
              },
            ),
          ),

        // Spacer before next section
        SizedBox(height: 8),
      ],
    );
  }

  Widget _buildSizesSection() {
    List<String> sizes = _product.productSizes;

    if (sizes.isEmpty) {
      return SizedBox.shrink();
    }

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: CupertinoColors.white,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(left: 16, top: 16, bottom: 8),
            child: Text(
              'Available Sizes',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: CupertinoColors.black,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(
              left: 16,
              right: 16,
              bottom: 16,
              top: 8,
            ),
            child: Wrap(
              spacing: 10,
              runSpacing: 8,
              children:
                  sizes.map((size) {
                    return Container(
                      padding: EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      decoration: BoxDecoration(
                        color: CupertinoColors.systemGrey5,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        size,
                        style: TextStyle(fontWeight: FontWeight.w500),
                      ),
                    );
                  }).toList(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDescription() {
    String description = _product.productDescription;

    if (description.isEmpty) {
      return SizedBox.shrink();
    }

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: CupertinoColors.white,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(left: 16, top: 16, bottom: 8),
            child: Text(
              'Description',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: CupertinoColors.black,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(left: 16, right: 16, bottom: 16),
            child: Text(
              description,
              style: TextStyle(
                fontSize: 16,
                height: 1.5,
                color: CupertinoColors.black,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
