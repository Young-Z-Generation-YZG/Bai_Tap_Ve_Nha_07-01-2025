import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:admin_flutter/pages/dashboards/products/update-product.page.dart';

class ProductDetailsPage extends StatefulWidget {
  final Map<String, dynamic> product;

  const ProductDetailsPage({super.key, required this.product});

  @override
  State<StatefulWidget> createState() => _ProductDetailsPageState();
}

class _ProductDetailsPageState extends State<ProductDetailsPage> {
  // Add a page controller for the image carousel
  late final PageController _imagePageController;
  int _currentImageIndex = 0;

  @override
  void initState() {
    super.initState();
    _imagePageController = PageController();
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
            'Edit',
            style: TextStyle(
              color: CupertinoColors.activeBlue,
              fontWeight: FontWeight.w600,
            ),
          ),
          onPressed: () async {
            final updatedProduct = await Navigator.push(
              context,
              CupertinoPageRoute(
                builder:
                    (context) => UpdateProductPage(product: widget.product),
              ),
            );

            if (updatedProduct != null) {
              // If we received an updated product, return to previous page with it
              Navigator.pop(context, updatedProduct);
            }
          },
        ),
      ),
      backgroundColor: CupertinoColors.systemGroupedBackground,
      child: SafeArea(
        child: ListView(
          children: [
            // Product Image Section
            _buildImageSection(),

            SizedBox(height: 16),

            // Product Basic Info
            _buildInfoSection('Product Information', [
              _buildInfoItem('Name', widget.product['name'] ?? ''),
              _buildInfoItem(
                'Price',
                '\$${widget.product['price']?.toString() ?? '0.00'}',
              ),
              _buildInfoItem(
                'Category',
                widget.product['category'] ?? 'Not specified',
              ),
              _buildInfoItem(
                'Brand',
                widget.product['brand'] ?? 'Not specified',
              ),
              _buildInfoItem(
                'Status',
                _formatStatus(widget.product['status'] ?? 'PUBLISHED'),
              ),
              _buildInfoItem(
                'Stock',
                widget.product['stock']?.toString() ?? '0',
              ),
              _buildInfoItem(
                'Color',
                widget.product['color'] ?? 'Not specified',
              ),
              _buildInfoItem(
                'Active',
                widget.product['isActive'] == true ? 'Yes' : 'No',
              ),
            ]),

            SizedBox(height: 16),

            // Sizes Section
            _buildSizesSection(),

            SizedBox(height: 16),

            // Description Section
            _buildDescription(),

            SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  Widget _buildImageSection() {
    // Get images or use a default if not available
    List<String> images = [];

    // Handle both old imageUrl and new images array
    if (widget.product.containsKey('images') &&
        widget.product['images'] is List) {
      images = List<String>.from(widget.product['images']);
    } else if (widget.product.containsKey('image') &&
        widget.product['image'] != null) {
      images = [widget.product['image']];
    } else if (widget.product.containsKey('imageUrl') &&
        widget.product['imageUrl'] != null) {
      images = [widget.product['imageUrl']];
    }

    // If no images available, use a placeholder
    if (images.isEmpty) {
      images = ['https://via.placeholder.com/400?text=No+Image'];
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Image carousel
        Container(
          height: 350,
          decoration: BoxDecoration(
            color: Colors.white,
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 10,
                offset: Offset(0, 5),
              ),
            ],
          ),
          child: PageView.builder(
            controller: _imagePageController,
            itemCount: images.length,
            onPageChanged: (index) {
              setState(() {
                _currentImageIndex = index;
              });
            },
            itemBuilder: (context, index) {
              return Container(
                padding: EdgeInsets.all(20),
                child: Image.network(
                  images[index],
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
        if (images.length > 1)
          Padding(
            padding: const EdgeInsets.only(top: 8.0, left: 16.0, right: 16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.black.withOpacity(0.6),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    '${_currentImageIndex + 1}/${images.length}',
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

        // Thumbnails for all images
        if (images.length > 1)
          Container(
            height: 80,
            margin: EdgeInsets.only(top: 12),
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.symmetric(horizontal: 16),
              itemCount: images.length,
              itemBuilder: (context, index) {
                return GestureDetector(
                  onTap: () {
                    _imagePageController.animateToPage(
                      index,
                      duration: Duration(milliseconds: 300),
                      curve: Curves.easeInOut,
                    );
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
                          color: Colors.black.withOpacity(0.05),
                          blurRadius: 4,
                          offset: Offset(0, 2),
                        ),
                      ],
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(6),
                      child: Image.network(
                        images[index],
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

  Widget _buildInfoSection(String title, List<Widget> children) {
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
              title,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: CupertinoColors.black,
              ),
            ),
          ),
          ...children,
        ],
      ),
    );
  }

  Widget _buildInfoItem(String label, String value) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(color: CupertinoColors.systemGrey5, width: 0.5),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(color: CupertinoColors.black, fontSize: 16),
          ),
          Text(
            value,
            style: TextStyle(color: CupertinoColors.systemGrey, fontSize: 16),
          ),
        ],
      ),
    );
  }

  Widget _buildMultiLineInfoItem(String text) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(16),
      child: Text(
        text,
        style: TextStyle(
          color: CupertinoColors.black,
          fontSize: 16,
          height: 1.5,
        ),
      ),
    );
  }

  Widget _buildSizesSection() {
    List<String> sizes = List<String>.from(widget.product['size'] ?? []);

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
            padding: const EdgeInsets.only(left: 16, right: 16, bottom: 16),
            child: Wrap(
              spacing: 8,
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
    String description = widget.product['description'] ?? '';

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

  String _formatStatus(String status) {
    switch (status) {
      case 'PUBLISHED':
        return 'Published';
      case 'DRAFT':
        return 'Draft';
      case 'SALE':
        return 'On Sale';
      case 'OUT_OF_STOCK':
        return 'Out of Stock';
      default:
        return status;
    }
  }
}
