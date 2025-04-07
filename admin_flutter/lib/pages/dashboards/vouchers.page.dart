import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:admin_flutter/widgets/card-wrapper.widget.dart';
import 'package:provider/provider.dart';
import 'package:admin_flutter/providers/ui_provider.dart';

class VoucherPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return VoucherPageState();
  }
}

class VoucherPageState extends State<VoucherPage> {
  double? _deviceWidth, _deviceHeight;
  final TextEditingController _searchController = TextEditingController();
  String _selectedCategory = "All";

  // Sample vouchers data
  final List<Map<String, dynamic>> vouchers = [
    {
      'code': 'WINTER25',
      'discount': '25%',
      'description': 'Winter Season Sale',
      'expiry': 'Feb 28, 2024',
      'usageLimit': 500,
      'used': 213,
      'category': 'Seasonal',
      'minPurchase': '\$50',
      'isActive': true,
    },
    {
      'code': 'WELCOME10',
      'discount': '\$10',
      'description': 'New User Discount',
      'expiry': 'No Expiry',
      'usageLimit': 1000,
      'used': 642,
      'category': 'User',
      'minPurchase': '\$20',
      'isActive': true,
    },
    {
      'code': 'FLASH50',
      'discount': '50%',
      'description': 'Flash Sale',
      'expiry': 'Today',
      'usageLimit': 100,
      'used': 98,
      'category': 'Flash',
      'minPurchase': '\$100',
      'isActive': true,
    },
    {
      'code': 'PREMIUM20',
      'discount': '20%',
      'description': 'Premium User Discount',
      'expiry': 'Jan 1, 2025',
      'usageLimit': 200,
      'used': 42,
      'category': 'User',
      'minPurchase': '\$75',
      'isActive': true,
    },
    {
      'code': 'SUMMER15',
      'discount': '15%',
      'description': 'Summer Special',
      'expiry': 'Aug 31, 2024',
      'usageLimit': 300,
      'used': 0,
      'category': 'Seasonal',
      'minPurchase': '\$30',
      'isActive': false,
    },
  ];

  // Filter categories
  final List<String> categories = ['All', 'Seasonal', 'User', 'Flash'];

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
            _buildHeader(),
            _buildSearchAndFilter(),
            _buildCategorySelector(),
            Expanded(child: _buildVouchersList()),
            _buildAddButton(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Padding(
      padding: EdgeInsets.only(left: 16.0, top: 16.0, bottom: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Vouchers',
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 8),
          Text(
            'Manage discount vouchers and promotions',
            style: TextStyle(fontSize: 14, color: Colors.grey[700]),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchAndFilter() {
    return Padding(
      padding: EdgeInsets.all(16.0),
      child: CupertinoSearchTextField(
        controller: _searchController,
        placeholder: 'Search vouchers...',
        onChanged: (value) {
          // Implement search functionality
        },
      ),
    );
  }

  Widget _buildCategorySelector() {
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

  Widget _buildVouchersList() {
    // Filter vouchers based on selected category
    final filteredVouchers =
        _selectedCategory == 'All'
            ? vouchers
            : vouchers
                .where((v) => v['category'] == _selectedCategory)
                .toList();

    return ListView.builder(
      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      itemCount: filteredVouchers.length,
      itemBuilder: (context, index) {
        final voucher = filteredVouchers[index];
        return _buildVoucherCard(voucher);
      },
    );
  }

  Widget _buildVoucherCard(Map<String, dynamic> voucher) {
    final isActive = voucher['isActive'] as bool;
    final usagePercent = voucher['used'] / voucher['usageLimit'];

    return Padding(
      padding: EdgeInsets.only(bottom: 16),
      child: CardWrapper(
        width: _deviceWidth! * 0.9,
        height: _deviceWidth! * 0.45,
        backgroundColor: Colors.white,
        child: Stack(
          children: [
            if (!isActive)
              Positioned(
                top: 0,
                right: 0,
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.red.withOpacity(0.1),
                    borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(8),
                      topRight: Radius.circular(10),
                    ),
                  ),
                  child: Text(
                    'Inactive',
                    style: TextStyle(
                      color: Colors.red,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            Container(
              padding: EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 6,
                        ),
                        decoration: BoxDecoration(
                          color: Color(0xFF9747FF).withOpacity(0.1),
                          borderRadius: BorderRadius.circular(5),
                        ),
                        child: Text(
                          voucher['code'],
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF9747FF),
                          ),
                        ),
                      ),
                      Spacer(),
                      Text(
                        voucher['discount'],
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: isActive ? Color(0xFF9747FF) : Colors.grey,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 12),
                  Text(
                    voucher['description'],
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 4),
                  Text(
                    'Min purchase: ${voucher['minPurchase']}',
                    style: TextStyle(fontSize: 13, color: Colors.grey[700]),
                  ),
                  SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Expiry: ${voucher['expiry']}',
                        style: TextStyle(fontSize: 13, color: Colors.grey[700]),
                      ),
                      Text(
                        'Used: ${voucher['used']}/${voucher['usageLimit']}',
                        style: TextStyle(fontSize: 13, color: Colors.grey[700]),
                      ),
                    ],
                  ),
                  SizedBox(height: 8),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(2),
                    child: LinearProgressIndicator(
                      value: usagePercent,
                      backgroundColor: Colors.grey[300],
                      valueColor: AlwaysStoppedAnimation<Color>(
                        usagePercent > 0.9 ? Colors.red : Color(0xFF9747FF),
                      ),
                      minHeight: 4,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAddButton() {
    return Container(
      padding: EdgeInsets.all(16),
      child: SizedBox(
        width: double.infinity,
        child: CupertinoButton(
          color: Color(0xFF9747FF),
          borderRadius: BorderRadius.circular(10),
          child: Text('Create New Voucher'),
          onPressed: () {
            // Implement voucher creation
          },
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
