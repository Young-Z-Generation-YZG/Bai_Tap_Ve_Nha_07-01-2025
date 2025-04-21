import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../promotions/create-promotion.page.dart';

class PromotionPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _PromotionPageState();
  }
}

class _PromotionPageState extends State<PromotionPage> {
  // Fake data for promotions
  final List<Map<String, dynamic>> _promotions = [
    {
      'id': '1',
      'name': 'Summer Sale',
      'code': 'SUMMER23',
      'discountType': 'Percentage',
      'discount': 20,
      'startDate': DateTime.now().subtract(Duration(days: 5)),
      'endDate': DateTime.now().add(Duration(days: 25)),
      'isActive': true,
      'categories': ['1', '4'], // Casual and Tops
      'affectedProducts': 27,
    },
    {
      'id': '2',
      'name': 'Denim Special',
      'code': 'DENIM15',
      'discountType': 'Percentage',
      'discount': 15,
      'startDate': DateTime.now().subtract(Duration(days: 10)),
      'endDate': DateTime.now().add(Duration(days: 20)),
      'isActive': true,
      'categories': ['5'], // Denim
      'affectedProducts': 10,
    },
    {
      'id': '3',
      'name': 'Formal Wear Discount',
      'code': 'FORMAL10',
      'discountType': 'Fixed Amount',
      'discount': 10,
      'startDate': DateTime.now().subtract(Duration(days: 15)),
      'endDate': DateTime.now().add(Duration(days: 15)),
      'isActive': true,
      'categories': ['2'], // Formal
      'affectedProducts': 8,
    },
    {
      'id': '4',
      'name': 'Winter Flash Sale',
      'code': 'WINTER25',
      'discountType': 'Percentage',
      'discount': 25,
      'startDate': DateTime.now().subtract(Duration(days: 60)),
      'endDate': DateTime.now().subtract(Duration(days: 30)),
      'isActive': false,
      'categories': ['1', '2', '5'], // Casual, Formal, Denim
      'affectedProducts': 30,
    },
  ];

  // Fake data for categories
  final List<Map<String, dynamic>> _categories = [
    {'id': '1', 'name': 'Casual', 'productCount': 12},
    {'id': '2', 'name': 'Formal', 'productCount': 8},
    {'id': '3', 'name': 'Maxi', 'productCount': 5},
    {'id': '4', 'name': 'Tops', 'productCount': 15},
    {'id': '5', 'name': 'Denim', 'productCount': 10},
  ];

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Promotions'),
        backgroundColor: CupertinoColors.systemGroupedBackground,
        border: null,
        trailing: CupertinoButton(
          padding: EdgeInsets.zero,
          child: Icon(CupertinoIcons.add),
          onPressed: () => _navigateToCreatePromotion(context),
        ),
      ),
      backgroundColor: CupertinoColors.systemGroupedBackground,
      child: SafeArea(
        child: ListView(
          padding: EdgeInsets.all(16.0),
          children: [
            _buildStatisticsSection(),
            SizedBox(height: 20),
            _buildCategoryPromotionsSection(),
            SizedBox(height: 20),
            _buildActivePromotionsSection(),
          ],
        ),
      ),
    );
  }

  Widget _buildStatisticsSection() {
    // Calculate statistics
    int activePromotions =
        _promotions.where((p) => p['isActive'] == true).length;
    int totalProducts = _categories.fold(
      0,
      (sum, cat) => sum + cat['productCount'] as int,
    );
    int productsOnPromotion = _promotions
        .where((p) => p['isActive'] == true)
        .fold(0, (sum, promo) => sum + promo['affectedProducts'] as int);
    double percentOnPromotion =
        totalProducts > 0 ? (productsOnPromotion / totalProducts * 100) : 0;

    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: CupertinoColors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 5,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Promotion Overview',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: CupertinoColors.black,
            ),
          ),
          SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildStatCard(
                icon: CupertinoIcons.tag_fill,
                value: activePromotions.toString(),
                label: 'Active Promotions',
                color: Color(0xFF9747FF),
              ),
              _buildStatCard(
                icon: CupertinoIcons.cube_box_fill,
                value: '$productsOnPromotion',
                label: 'Products on Sale',
                color: Color(0xFF47B5FF),
              ),
              _buildStatCard(
                icon: CupertinoIcons.percent,
                value: '${percentOnPromotion.toStringAsFixed(1)}%',
                label: 'Catalog Coverage',
                color: Color(0xFF4ECB71),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatCard({
    required IconData icon,
    required String value,
    required String label,
    required Color color,
  }) {
    return Column(
      children: [
        Container(
          width: 50,
          height: 50,
          decoration: BoxDecoration(
            color: color.withOpacity(0.2),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Center(child: Icon(icon, color: color, size: 24)),
        ),
        SizedBox(height: 8),
        Text(
          value,
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: CupertinoColors.black,
          ),
        ),
        Text(
          label,
          style: TextStyle(fontSize: 12, color: CupertinoColors.systemGrey),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildCategoryPromotionsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4.0, bottom: 12.0),
          child: Text(
            'Promotions by Category',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: CupertinoColors.black,
            ),
          ),
        ),
        Container(
          height: 130,
          child: ListView(
            scrollDirection: Axis.horizontal,
            children:
                _categories.map((category) {
                  // Count promotions for this category
                  int promotionsCount =
                      _promotions
                          .where(
                            (p) =>
                                p['isActive'] == true &&
                                p['categories'].contains(category['id']),
                          )
                          .length;

                  return _buildCategoryCard(
                    name: category['name'],
                    productCount: category['productCount'],
                    promotionsCount: promotionsCount,
                  );
                }).toList(),
          ),
        ),
      ],
    );
  }

  Widget _buildCategoryCard({
    required String name,
    required int productCount,
    required int promotionsCount,
  }) {
    return Container(
      width: 150,
      margin: EdgeInsets.only(right: 12),
      padding: EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: CupertinoColors.white,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 5,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Category icon
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: Color(0xFF9747FF).withOpacity(0.2),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Center(
              child: Icon(
                CupertinoIcons.tag,
                color: Color(0xFF9747FF),
                size: 20,
              ),
            ),
          ),
          SizedBox(height: 8),
          // Category name
          Text(
            name,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w500,
              color: CupertinoColors.black,
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          Spacer(),
          // Stats
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '$productCount Products',
                style: TextStyle(
                  fontSize: 12,
                  color: CupertinoColors.systemGrey,
                ),
              ),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color:
                      promotionsCount > 0
                          ? Color(0xFF9747FF).withOpacity(0.1)
                          : CupertinoColors.systemGrey5,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  '$promotionsCount Promo${promotionsCount != 1 ? 's' : ''}',
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    color:
                        promotionsCount > 0
                            ? Color(0xFF9747FF)
                            : CupertinoColors.systemGrey,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildActivePromotionsSection() {
    List<Map<String, dynamic>> activePromotions =
        _promotions.where((p) => p['isActive'] == true).toList();

    List<Map<String, dynamic>> inactivePromotions =
        _promotions.where((p) => p['isActive'] == false).toList();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4.0, bottom: 12.0),
          child: Text(
            'Active Promotions',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: CupertinoColors.black,
            ),
          ),
        ),
        ...activePromotions.map((promo) => _buildPromotionCard(promo)),

        if (inactivePromotions.isNotEmpty) ...[
          SizedBox(height: 20),
          Padding(
            padding: const EdgeInsets.only(left: 4.0, bottom: 12.0),
            child: Text(
              'Inactive Promotions',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: CupertinoColors.black,
              ),
            ),
          ),
          ...inactivePromotions.map((promo) => _buildPromotionCard(promo)),
        ],
      ],
    );
  }

  Widget _buildPromotionCard(Map<String, dynamic> promotion) {
    // Get categories for this promotion
    List<String> categoryNames = [];
    for (String catId in promotion['categories']) {
      var category = _categories.firstWhere(
        (c) => c['id'] == catId,
        orElse: () => {'name': 'Unknown'},
      );
      categoryNames.add(category['name']);
    }

    // Format date range
    String dateRange = _formatDateRange(
      promotion['startDate'],
      promotion['endDate'],
    );

    // Format discount display
    String discountDisplay = '';
    if (promotion['discountType'] == 'Percentage') {
      discountDisplay = '${promotion['discount']}%';
    } else {
      discountDisplay = '\$${promotion['discount']}';
    }

    // Check if promotion is expired
    bool isExpired = promotion['endDate'].isBefore(DateTime.now());
    bool isActive = promotion['isActive'] == true;

    // Status text and color
    String statusText =
        isActive ? (isExpired ? 'Expired' : 'Active') : 'Inactive';

    Color statusColor =
        isActive
            ? (isExpired
                ? CupertinoColors.systemOrange
                : CupertinoColors.activeGreen)
            : CupertinoColors.systemGrey;

    return Container(
      margin: EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: CupertinoColors.white,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 5,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          // Header with name and discount
          Container(
            padding: EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: isActive ? Color(0xFFEEE5FF) : CupertinoColors.systemGrey6,
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(10),
                topRight: Radius.circular(10),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    // Promotion icon
                    Container(
                      width: 36,
                      height: 36,
                      decoration: BoxDecoration(
                        color:
                            isActive
                                ? Color(0xFF9747FF).withOpacity(0.2)
                                : CupertinoColors.systemGrey5,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Center(
                        child: Icon(
                          CupertinoIcons.tag_fill,
                          color:
                              isActive
                                  ? Color(0xFF9747FF)
                                  : CupertinoColors.systemGrey,
                          size: 18,
                        ),
                      ),
                    ),
                    SizedBox(width: 8),
                    // Promotion name
                    Text(
                      promotion['name'],
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: CupertinoColors.black,
                      ),
                    ),
                  ],
                ),
                // Discount badge
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color:
                        isActive
                            ? Color(0xFF9747FF)
                            : CupertinoColors.systemGrey,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Text(
                    discountDisplay + ' OFF',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: CupertinoColors.white,
                    ),
                  ),
                ),
              ],
            ),
          ),
          // Promotion details
          Padding(
            padding: EdgeInsets.all(12),
            child: Column(
              children: [
                // Code
                Row(
                  children: [
                    Container(
                      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: CupertinoColors.systemGrey6,
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Text(
                        promotion['code'],
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w500,
                          color: CupertinoColors.systemGrey,
                          letterSpacing: 1,
                        ),
                      ),
                    ),
                    SizedBox(width: 8),
                    Container(
                      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: statusColor.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Text(
                        statusText,
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w500,
                          color: statusColor,
                        ),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 12),
                // Dates and products
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Icon(
                          CupertinoIcons.calendar,
                          size: 14,
                          color: CupertinoColors.systemGrey,
                        ),
                        SizedBox(width: 4),
                        Text(
                          dateRange,
                          style: TextStyle(
                            fontSize: 12,
                            color: CupertinoColors.systemGrey,
                          ),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        Icon(
                          CupertinoIcons.cube_box,
                          size: 14,
                          color: CupertinoColors.systemGrey,
                        ),
                        SizedBox(width: 4),
                        Text(
                          '${promotion['affectedProducts']} Products',
                          style: TextStyle(
                            fontSize: 12,
                            color: CupertinoColors.systemGrey,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                SizedBox(height: 12),
                // Categories
                if (categoryNames.isNotEmpty)
                  Container(
                    width: double.infinity,
                    padding: EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: CupertinoColors.systemGrey6,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Categories:',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w500,
                            color: CupertinoColors.systemGrey,
                          ),
                        ),
                        SizedBox(height: 6),
                        Wrap(
                          spacing: 6,
                          runSpacing: 6,
                          children:
                              categoryNames
                                  .map(
                                    (name) => Container(
                                      padding: EdgeInsets.symmetric(
                                        horizontal: 8,
                                        vertical: 4,
                                      ),
                                      decoration: BoxDecoration(
                                        color:
                                            isActive
                                                ? Color(
                                                  0xFF9747FF,
                                                ).withOpacity(0.1)
                                                : CupertinoColors.systemGrey5,
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      child: Text(
                                        name,
                                        style: TextStyle(
                                          fontSize: 11,
                                          fontWeight: FontWeight.w500,
                                          color:
                                              isActive
                                                  ? Color(0xFF9747FF)
                                                  : CupertinoColors.systemGrey,
                                        ),
                                      ),
                                    ),
                                  )
                                  .toList(),
                        ),
                      ],
                    ),
                  ),
              ],
            ),
          ),
          // Action buttons
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                CupertinoButton(
                  padding: EdgeInsets.zero,
                  child: Text(
                    'Edit',
                    style: TextStyle(
                      fontSize: 14,
                      color: CupertinoColors.activeBlue,
                    ),
                  ),
                  onPressed: () {
                    // Edit promotion action
                  },
                ),
                SizedBox(width: 8),
                CupertinoButton(
                  padding: EdgeInsets.zero,
                  child: Text(
                    isActive ? 'Deactivate' : 'Activate',
                    style: TextStyle(
                      fontSize: 14,
                      color:
                          isActive
                              ? CupertinoColors.destructiveRed
                              : CupertinoColors.activeGreen,
                    ),
                  ),
                  onPressed: () {
                    // Toggle activation state
                    setState(() {
                      promotion['isActive'] = !promotion['isActive'];
                    });
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  String _formatDateRange(DateTime start, DateTime end) {
    String formatDate(DateTime date) {
      return '${date.month}/${date.day}/${date.year}';
    }

    return '${formatDate(start)} - ${formatDate(end)}';
  }

  void _navigateToCreatePromotion(BuildContext context) async {
    final result = await Navigator.push(
      context,
      CupertinoPageRoute(builder: (context) => CreatePromotionPage()),
    );

    // if (result != null) {
    //   // Add the new promotion to the list
    //   setState(() {
    //     final newPromotion = {
    //       ...(result as Map<String, dynamic>),
    //       'id': (_promotions.length + 1).toString(),
    //       'affectedProducts': _calculateAffectedProducts(
    //         (result as Map<String, dynamic>)['categories'],
    //       ),
    //     };

    //     _promotions.insert(0, newPromotion);
    //   });
    // }
  }

  int _calculateAffectedProducts(List<dynamic> categoryIds) {
    int count = 0;
    for (var catId in categoryIds) {
      var category = _categories.firstWhere(
        (c) => c['id'] == catId,
        orElse: () => {'productCount': 0},
      );
      count += category['productCount'] as int;
    }
    return count;
  }
}
