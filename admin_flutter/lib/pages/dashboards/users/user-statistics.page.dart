import 'dart:convert';

import 'package:admin_flutter/domain/responses/user-statistic.response.dart';
import 'package:admin_flutter/domain/user.dart';
import 'package:admin_flutter/pages/dashboards/users/_widgets/order-list-section.widget.dart';
import 'package:admin_flutter/pages/dashboards/users/_widgets/order-summany-section.widget.dart';
import 'package:admin_flutter/pages/dashboards/users/_widgets/purchase-history-section.widget.dart';
import 'package:admin_flutter/services/http.service.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class UserStatisticsPage extends StatefulWidget {
  final User? user;

  const UserStatisticsPage({Key? key, this.user}) : super(key: key);

  @override
  State<UserStatisticsPage> createState() => _UserStatisticsPageState();
}

class _UserStatisticsPageState extends State<UserStatisticsPage> {
  double? _deviceWidth, _deviceHeight;
  String _selectedPeriod = 'Last 30 days';

  late HttpService? _http;

  late UserStatisticResponse? _userStatisticResponse = null;

  // Sample user data
  final Map<String, dynamic> _userData = {
    'name': 'John Doe',
    'email': 'john.doe@example.com',
    'phone': '+1 (555) 123-4567',
    'registeredDate': '2022-08-15',
    'totalOrders': 24,
    'totalSpent': 4785.50,
    'averageOrderValue': 199.40,
  };

  // Filter options for time period
  final List<String> _periodFilters = [
    'Last 30 days',
    'Last 3 months',
    'Last 6 months',
    'Last year',
    'All time',
  ];

  @override
  void initState() {
    super.initState();

    _http = HttpService();

    _fetUserStatistics();
  }

  @override
  Widget build(BuildContext context) {
    _deviceWidth = MediaQuery.of(context).size.width;
    _deviceHeight = MediaQuery.of(context).size.height;

    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Customer Statistics'),
        backgroundColor: CupertinoColors.systemGroupedBackground,
        border: null,
        leading: CupertinoNavigationBarBackButton(
          onPressed: () => Navigator.pop(context),
        ),
      ),
      backgroundColor: CupertinoColors.systemGroupedBackground,
      child: SafeArea(
        child: SingleChildScrollView(
          physics: BouncingScrollPhysics(),
          padding: EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildUserProfileCard(),
              SizedBox(height: 16),
              _buildPeriodSelector(),
              SizedBox(height: 16),
              orderSummarySection(context, _userStatisticResponse),
              SizedBox(height: 20),
              PurchaseHistorySection(),
              SizedBox(height: 20),
              OrderListSection(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildUserProfileCard() {
    return Container(
      padding: EdgeInsets.all(16),
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
      child: Row(
        children: [
          // Customer avatar
          Container(
            width: 64,
            height: 64,
            decoration: BoxDecoration(
              color: Color(0xFFEEE5FF),
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Icon(
                CupertinoIcons.person_fill,
                color: Color(0xFF9747FF),
                size: 32,
              ),
            ),
          ),
          SizedBox(width: 16),
          // Customer details
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  _userStatisticResponse?.profile.customerName ??
                      _userData['name'],
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 4),
                Text(
                  _userStatisticResponse?.profile.email ?? _userData['email'],
                  style: TextStyle(fontSize: 14, color: Colors.grey[600]),
                ),
                SizedBox(height: 2),
                Text(
                  _userStatisticResponse?.profile.phoneNumber ??
                      _userData['phone'],
                  style: TextStyle(fontSize: 14, color: Colors.grey[600]),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPeriodSelector() {
    return Container(
      height: 40,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: _periodFilters.length,
        itemBuilder: (context, index) {
          final period = _periodFilters[index];
          final isSelected = _selectedPeriod == period;

          return GestureDetector(
            onTap: () {
              setState(() {
                _selectedPeriod = period;
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
                period,
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

  void _fetUserStatistics() async {
    final response = await _http!.get(
      '/api/v1/invoices/statistics/${widget.user?.id}/admin',
    );

    if (response != null) {
      Map<String, dynamic> data = jsonDecode(response.toString());

      if (data.containsKey("data") && data["data"] is Map) {
        var userStatistic = UserStatisticResponse.fromJson(data["data"]);

        setState(() {
          _userStatisticResponse = userStatistic;
        });
      } else {
        print("Invalid data format");
      }
    }
  }
}
