import 'package:admin_flutter/domain/responses/user-statistic.response.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

final List<Map<String, dynamic>> _orderStatsByStatus = [
  {
    'status': 'Pending',
    'count': 3,
    'amount': 450.75,
    'color': Color(0xFFFFA500), // Orange
    'icon': CupertinoIcons.time,
  },
  {
    'status': 'Processing',
    'count': 2,
    'amount': 325.85,
    'color': Color(0xFF3498DB), // Blue
    'icon': CupertinoIcons.arrow_clockwise,
  },
  {
    'status': 'Shipping',
    'count': 4,
    'amount': 875.30,
    'color': Color(0xFF9747FF), // Purple
    'icon': CupertinoIcons.cube_box,
  },
  {
    'status': 'Delivered',
    'count': 15,
    'amount': 3133.60,
    'color': Color(0xFF2ECC71), // Green
    'icon': CupertinoIcons.check_mark_circled,
  },
];

Widget orderSummarySection(
  BuildContext context,
  UserStatisticResponse? userStatisticResponse,
) {
  print("userStatisticResponse");

  final List<Map<String, dynamic>> orderStats = [
    {
      'status': 'PENDING',
      'count':
          userStatisticResponse?.orderSummary.orderStatus["PENDING"]?.count ??
          0,
      'amount':
          userStatisticResponse?.orderSummary.orderStatus["PENDING"]?.revenue ??
          0.0,
      'color': Color(0xFFFFA500), // Orange
      'icon': CupertinoIcons.time,
    },
    {
      'status': 'CONFIRMED',
      'count':
          userStatisticResponse?.orderSummary.orderStatus["CONFIRMED"]?.count ??
          0,
      'amount':
          userStatisticResponse
              ?.orderSummary
              .orderStatus["CONFIRMED"]
              ?.revenue ??
          0.0,
      'color': Color(0xFF3498DB), // Blue
      'icon': CupertinoIcons.arrow_clockwise,
    },
    {
      'status': 'ON_DELIVERING',
      'count':
          userStatisticResponse
              ?.orderSummary
              .orderStatus["ON_DELIVERING"]
              ?.count ??
          0,
      'amount':
          userStatisticResponse
              ?.orderSummary
              .orderStatus["ON_DELIVERING"]
              ?.revenue ??
          0.0,
      'color': Color(0xFF9747FF), // Purple
      'icon': CupertinoIcons.cube_box,
    },
    {
      'status': 'DELIVERED',
      'count':
          userStatisticResponse?.orderSummary.orderStatus["DELIVERED"]?.count ??
          0,
      'amount':
          userStatisticResponse
              ?.orderSummary
              .orderStatus["DELIVERED"]
              ?.revenue ??
          0.0,
      'color': Color(0xFF2ECC71), // Green
      'icon': CupertinoIcons.check_mark_circled,
    },
  ];

  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(
        'Order Status Summary',
        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
      ),
      SizedBox(height: 12),
      Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withAlpha(5),
              blurRadius: 10,
              offset: Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          children: [
            _buildOrderStatSummary(userStatisticResponse),
            Divider(height: 1),
            // Order status cards
            GridView.count(
              physics: NeverScrollableScrollPhysics(),
              shrinkWrap: true,
              crossAxisCount: 2,
              childAspectRatio: 1.5,
              padding: EdgeInsets.all(16),
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              children:
                  orderStats.map((stat) {
                    return _buildOrderStatusCard(
                      status: stat['status'],
                      count: stat['count'],
                      amount: stat['amount'],
                      color: stat['color'],
                      icon: stat['icon'],
                    );
                  }).toList(),
            ),
          ],
        ),
      ),
    ],
  );
}

Widget _buildOrderStatSummary(UserStatisticResponse? userStatisticResponse) {
  // Calculate totals
  final totalOrders = _orderStatsByStatus.fold(
    0,
    (sum, stat) => sum + stat['count'] as int,
  );
  final totalAmount = _orderStatsByStatus.fold(
    0.0,
    (sum, stat) => sum + stat['amount'] as double,
  );

  return Padding(
    padding: EdgeInsets.all(16),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        Column(
          children: [
            Text(
              'Total Orders',
              style: TextStyle(fontSize: 14, color: Colors.grey[600]),
            ),
            SizedBox(height: 6),
            Text(
              userStatisticResponse?.orderSummary.totalOrders.toString() ??
                  totalOrders.toString(),
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Color(0xFF9747FF),
              ),
            ),
          ],
        ),
        Container(height: 40, width: 1, color: Colors.grey[300]),
        Column(
          children: [
            Text(
              'Total Spent',
              style: TextStyle(fontSize: 14, color: Colors.grey[600]),
            ),
            SizedBox(height: 6),
            Text(
              '\$${userStatisticResponse?.orderSummary.totalSpend.toStringAsFixed(2)}',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Color(0xFF9747FF),
              ),
            ),
          ],
        ),
      ],
    ),
  );
}

Widget _buildOrderStatusCard({
  required String status,
  required int count,
  required double amount,
  required Color color,
  required IconData icon,
}) {
  return Container(
    padding: EdgeInsets.all(12),
    decoration: BoxDecoration(
      color: color.withAlpha(10),
      borderRadius: BorderRadius.circular(8),
      border: Border.all(color: color.withAlpha(10), width: 1),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              status,
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
            Icon(icon, color: color, size: 18),
          ],
        ),
        Spacer(),
        Text(
          count.toString(),
          style: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.bold,
            color: Colors.black87,
          ),
        ),
        SizedBox(height: 4),
        Text(
          '\$${amount.toStringAsFixed(2)}',
          style: TextStyle(fontSize: 14, color: Colors.grey[700]),
        ),
      ],
    ),
  );
}
