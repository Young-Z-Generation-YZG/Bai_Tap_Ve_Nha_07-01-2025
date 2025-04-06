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

  // Sample product data
  final List<Map<String, dynamic>> products = [
    {
      'name': 'Floral Summer Dress',
      'category': "Women's Dresses",
      'price': 79.99,
      'image':
          'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800',
      'stock': 35,
    },
    {
      'name': 'Casual Blazer',
      'category': "Women's Outerwear",
      'price': 129.99,
      'image':
          'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800',
      'stock': 28,
    },
    {
      'name': 'High-Waist Jeans',
      'category': "Women's Bottoms",
      'price': 89.99,
      'image':
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800',
      'stock': 42,
    },
    {
      'name': 'Silk Blouse',
      'category': "Women's Tops",
      'price': 69.99,
      'image':
          'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800',
      'stock': 23,
    },
  ];

  @override
  Widget build(BuildContext context) {
    _deviceWidth = MediaQuery.of(context).size.width;
    _deviceHeight = MediaQuery.of(context).size.height;

    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Products'),
        backgroundColor: Color(0xFFf6f6f6),
        border: null,
        leading: CupertinoNavigationBarBackButton(
          color: CupertinoColors.activeBlue,
          // previousPageTitle: 'Home',
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      backgroundColor: Color(0xFFf6f6f6),
      child: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: EdgeInsets.all(16.0),
              child: CupertinoSearchTextField(
                controller: _searchController,
                placeholder: 'Search products...',
                onChanged: (value) {
                  // Implement search functionality
                },
              ),
            ),
            Expanded(
              child: ListView.builder(
                padding: EdgeInsets.symmetric(horizontal: 16.0),
                itemCount: products.length,
                itemBuilder: (context, index) {
                  final product = products[index];
                  return _productCard(product);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _productCard(Map<String, dynamic> product) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: CardWrapper(
        width: _deviceWidth! * 0.9,
        height: _deviceHeight! * 0.15,
        backgroundColor: Colors.white,
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Row(
            children: [
              // Product Image
              Container(
                width: 100,
                height: 100,
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
                      product['category'],
                      style: TextStyle(fontSize: 14, color: Colors.grey),
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

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }
}
