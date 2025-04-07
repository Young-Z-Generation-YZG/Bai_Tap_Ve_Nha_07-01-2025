import 'package:admin_flutter/pages/products/create-product.page.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:admin_flutter/widgets/card-wrapper.widget.dart';

class ProductPage extends StatefulWidget {
  const ProductPage({super.key});

  @override
  State<StatefulWidget> createState() {
    return ProductPageState();
  }
}

class ProductPageState extends State<ProductPage> {
  double? _deviceWidth, _deviceHeight;
  final TextEditingController _searchController = TextEditingController();
  String _selectedCategory = "All";

  // Sample product data
  final List<Map<String, dynamic>> products = [
    {
      'name': 'Sunflower Jumpsuit',
      'category': "Maxi",
      "branch": "Louis Vuitton",
      "color": "Yellow",
      "size": ["S", "M", "L"],
      'price': 100.0,
      "status": "PUBLISHED",
      "averange_rating": 4.5,
      "rating_count": 100,
      'image':
          'https://res.cloudinary.com/djiju7xcq/image/upload/v1729839380/Sunflower-Jumpsuit-1-690x875_dibawa.webp',
      'stock': 300,
    },
    {
      'name': 'Floral Summer Dress',
      'category': "Casual",
      "branch": "Zara",
      "color": "Blue",
      "size": ["XS", "S", "M", "L"],
      'price': 79.99,
      "status": "PUBLISHED",
      "averange_rating": 4.2,
      "rating_count": 87,
      'image': 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
      'stock': 150,
    },
    {
      'name': 'Casual Blazer',
      'category': "Formal",
      "branch": "H&M",
      "color": "Black",
      "size": ["S", "M", "L", "XL"],
      'price': 120.0,
      "status": "PUBLISHED",
      "averange_rating": 4.7,
      "rating_count": 65,
      'image': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
      'stock': 75,
    },
  ];

  // Categories for filtering
  final List<String> categories = ['All', 'Maxi', 'Casual', 'Formal'];

  @override
  Widget build(BuildContext context) {
    _deviceWidth = MediaQuery.of(context).size.width;
    _deviceHeight = MediaQuery.of(context).size.height;

    return Container(
      color: Color(0xFFf6f6f6),
      child: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header with more options button
            Padding(
              padding: EdgeInsets.only(
                left: 16.0,
                right: 16.0,
                top: 8.0,
                bottom: 16.0,
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Products',
                    style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
                  ),
                  CupertinoButton(
                    padding: EdgeInsets.zero,
                    child: Icon(
                      CupertinoIcons.ellipsis,
                      color: CupertinoColors.systemBlue,
                    ),
                    onPressed: () => _showActionsMenu(context),
                  ),
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.0),
              child: CupertinoSearchTextField(
                controller: _searchController,
                placeholder: 'Search products...',
                onChanged: (value) {
                  // Implement search functionality
                },
              ),
            ),
            SizedBox(height: 16),
            _buildCategoryFilter(),
            Expanded(child: _buildProductsList()),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoryFilter() {
    return Container(
      height: 40,
      margin: EdgeInsets.only(bottom: 16),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: EdgeInsets.symmetric(horizontal: 16),
        itemCount: categories.length,
        itemBuilder: (context, index) {
          final category = categories[index];
          final isSelected = _selectedCategory == category;

          return GestureDetector(
            onTap: () {
              setState(() {
                _selectedCategory = category;
              });
            },
            child: Container(
              margin: EdgeInsets.only(right: 12),
              padding: EdgeInsets.symmetric(horizontal: 16),
              decoration: BoxDecoration(
                color: isSelected ? Color(0xFF9747FF) : Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(
                  color: isSelected ? Color(0xFF9747FF) : Colors.grey.shade300,
                ),
              ),
              alignment: Alignment.center,
              child: Text(
                category,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                  color: isSelected ? Colors.white : Colors.black87,
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildProductsList() {
    // Filter products based on selected category
    final filteredProducts =
        _selectedCategory == 'All'
            ? products
            : products
                .where((p) => p['category'] == _selectedCategory)
                .toList();

    return ListView.builder(
      padding: EdgeInsets.symmetric(horizontal: 16.0),
      itemCount: filteredProducts.length,
      itemBuilder: (context, index) {
        final product = filteredProducts[index];
        return _productCard(product);
      },
    );
  }

  Widget _productCard(Map<String, dynamic> product) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: CardWrapper(
        width: _deviceWidth! * 0.9,
        height: _deviceHeight! * 0.2,
        backgroundColor: Colors.white,
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Row(
            children: [
              // Product Image
              Container(
                width: 100,
                height: 120,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  image: DecorationImage(
                    image: NetworkImage(product['image']),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              SizedBox(width: 16),
              // Product Details
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
                            product['name'],
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        CupertinoButton(
                          padding: EdgeInsets.zero,
                          child: Icon(
                            CupertinoIcons.pencil_circle_fill,
                            color: Color(0xFF9747FF),
                            size: 24,
                          ),
                          onPressed: () => _showEditDialog(product),
                        ),
                      ],
                    ),
                    SizedBox(height: 4),
                    Text(
                      '${product['category']} • ${product['branch']} • ${product['color']}',
                      style: TextStyle(fontSize: 13, color: Colors.grey),
                    ),
                    SizedBox(height: 6),
                    // Rating display
                    Row(
                      children: [
                        Icon(
                          CupertinoIcons.star_fill,
                          size: 14,
                          color: Colors.amber,
                        ),
                        SizedBox(width: 4),
                        Text(
                          '${product['averange_rating']} (${product['rating_count']})',
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
                          '\$${product['price']}',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w700,
                            color: Color(0xFF9747FF),
                          ),
                        ),
                        // Status tag
                        _buildStatusTag(product['status']),
                      ],
                    ),
                    SizedBox(height: 6),
                    // Size options
                    Row(
                      children: [
                        Text(
                          'Sizes: ',
                          style: TextStyle(
                            fontSize: 12,
                            color: Colors.grey[700],
                          ),
                        ),
                        SizedBox(width: 4),
                        ...(product['size'] as List<String>)
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
                            'Stock: ${product['stock']}',
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
    );
  }

  Widget _buildStatusTag(String status) {
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

  void _showEditDialog(Map<String, dynamic> product) {
    final TextEditingController nameController = TextEditingController(
      text: product['name'],
    );
    final TextEditingController priceController = TextEditingController(
      text: product['price'].toString(),
    );
    final TextEditingController stockController = TextEditingController(
      text: product['stock'].toString(),
    );

    showCupertinoModalPopup(
      context: context,
      builder:
          (BuildContext context) => Container(
            height: 400,
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: CupertinoColors.systemBackground,
              borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Edit Product',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 20),
                CupertinoTextField(
                  controller: nameController,
                  placeholder: 'Product Name',
                  padding: EdgeInsets.all(12),
                ),
                SizedBox(height: 12),
                CupertinoTextField(
                  controller: priceController,
                  placeholder: 'Price',
                  keyboardType: TextInputType.number,
                  padding: EdgeInsets.all(12),
                ),
                SizedBox(height: 12),
                CupertinoTextField(
                  controller: stockController,
                  placeholder: 'Stock',
                  keyboardType: TextInputType.number,
                  padding: EdgeInsets.all(12),
                ),
                SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    CupertinoButton(
                      child: Text('Cancel'),
                      onPressed: () => Navigator.pop(context),
                    ),
                    CupertinoButton.filled(
                      child: Text('Save'),
                      onPressed: () {
                        // Update the product
                        setState(() {
                          product['name'] = nameController.text;
                          product['price'] =
                              double.tryParse(priceController.text) ??
                              product['price'];
                          product['stock'] =
                              int.tryParse(stockController.text) ??
                              product['stock'];
                        });
                        Navigator.pop(context);
                      },
                    ),
                  ],
                ),
              ],
            ),
          ),
    );
  }

  void _showActionsMenu(BuildContext context) {
    showCupertinoModalPopup(
      context: context,
      builder:
          (BuildContext context) => CupertinoActionSheet(
            title: Text('Menu'),
            actions: [
              // Create action
              CupertinoActionSheetAction(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Create'),
                    Icon(
                      CupertinoIcons.plus_circle,
                      color: CupertinoColors.systemBlue,
                    ),
                  ],
                ),
                onPressed: () async {
                  Navigator.pop(context); // Close the action sheet first

                  await Navigator.push(
                    context,
                    CupertinoPageRoute(
                      builder: (context) => CreateProductPage(),
                    ),
                  );

                  // final newProduct = await Navigator.push(
                  //   context,
                  //   CupertinoPageRoute(
                  //     builder: (context) => CreateProductPage(),
                  //   ),
                  // );
                },
              ),
              // Select action
              CupertinoActionSheetAction(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Select'),
                    Icon(
                      CupertinoIcons.checkmark_circle,
                      color: CupertinoColors.systemGreen,
                    ),
                  ],
                ),
                onPressed: () {
                  // Implement select functionality
                  Navigator.pop(context);
                },
              ),
              // Select and edit action
              // CupertinoActionSheetAction(
              //   child: Row(
              //     mainAxisAlignment: MainAxisAlignment.spaceBetween,
              //     children: [
              //       Text('Select and edit'),
              //       Icon(CupertinoIcons.pencil, color: CupertinoColors.black),
              //     ],
              //   ),
              //   onPressed: () {
              //     // Implement select and edit functionality
              //     Navigator.pop(context);
              //   },
              // ),
            ],
            cancelButton: CupertinoActionSheetAction(
              child: Text('Cancel'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ),
    );
  }

  void _showCreateProductDialog() {
    final TextEditingController nameController = TextEditingController();
    final TextEditingController priceController = TextEditingController();
    final TextEditingController stockController = TextEditingController();

    showCupertinoModalPopup(
      context: context,
      builder:
          (BuildContext context) => Container(
            height: 400,
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: CupertinoColors.systemBackground,
              borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Create Product',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 20),
                CupertinoTextField(
                  controller: nameController,
                  placeholder: 'Product Name',
                  padding: EdgeInsets.all(12),
                ),
                SizedBox(height: 12),
                CupertinoTextField(
                  controller: priceController,
                  placeholder: 'Price',
                  keyboardType: TextInputType.number,
                  padding: EdgeInsets.all(12),
                ),
                SizedBox(height: 12),
                CupertinoTextField(
                  controller: stockController,
                  placeholder: 'Stock',
                  keyboardType: TextInputType.number,
                  padding: EdgeInsets.all(12),
                ),
                SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    CupertinoButton(
                      child: Text('Cancel'),
                      onPressed: () => Navigator.pop(context),
                    ),
                    CupertinoButton.filled(
                      child: Text('Create'),
                      onPressed: () {
                        // Create new product
                        if (nameController.text.isNotEmpty &&
                            priceController.text.isNotEmpty &&
                            stockController.text.isNotEmpty) {
                          setState(() {
                            products.add({
                              'name': nameController.text,
                              'category': "New",
                              "branch": "Brand",
                              "color": "Default",
                              "size": ["M"],
                              'price':
                                  double.tryParse(priceController.text) ?? 0.0,
                              "status": "PUBLISHED",
                              "averange_rating": 0.0,
                              "rating_count": 0,
                              'image': 'https://via.placeholder.com/150',
                              'stock': int.tryParse(stockController.text) ?? 0,
                            });
                          });
                          Navigator.pop(context);
                        }
                      },
                    ),
                  ],
                ),
              ],
            ),
          ),
    );
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }
}
