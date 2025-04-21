import 'dart:convert';

import 'package:admin_flutter/domain/order.dart';
import 'package:admin_flutter/pages/dashboards/orders/_widgets/order-item.widget.dart';
import 'package:admin_flutter/services/http.service.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

class OrdersListV2Page extends StatefulWidget {
  const OrdersListV2Page({super.key});

  @override
  State<StatefulWidget> createState() => _OrdersListV2PageState();
}

class _OrdersListV2PageState extends State<OrdersListV2Page> {
  late HttpService? _http;
  double? _deviceWidth, _deviceHeight;
  final TextEditingController _searchController = TextEditingController();
  String _selectedFilter = "All";
  List<Order> _orders = [];

  // Filters for order status
  final List<String> filters = [
    'All',
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
  ];

  @override
  void initState() {
    super.initState();
    _http = GetIt.instance.get<HttpService>();
    _fetchOrders(); // Fetch orders when component mounts
  }

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
            // Header
            Padding(
              padding: EdgeInsets.only(
                left: 16.0,
                right: 16.0,
                top: 8.0,
                bottom: 16.0,
              ),
              child: Text(
                'Orders',
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
              ),
            ),
            // Search bar
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.0),
              child: CupertinoSearchTextField(
                controller: _searchController,
                placeholder: 'Search orders...',
                onChanged: (value) {
                  // Implement search functionality
                },
              ),
            ),
            SizedBox(height: 16),
            // Status filter
            _buildStatusFilter(),
            // Orders list
            Expanded(child: ordersList()),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusFilter() {
    return Container(
      height: 40,
      margin: EdgeInsets.only(bottom: 16),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: EdgeInsets.symmetric(horizontal: 16),
        itemCount: filters.length,
        itemBuilder: (context, index) {
          final filter = filters[index];
          final isSelected = _selectedFilter == filter;

          return GestureDetector(
            onTap: () {
              setState(() {
                _selectedFilter = filter;
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
                filter,
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

  Widget ordersList() {
    return ListView.builder(
      padding: EdgeInsets.symmetric(horizontal: 16.0),
      itemCount: _orders.length,
      itemBuilder: (context, index) {
        return OrderItemWidget(context, _orders[index]);
      },
    );
  }

  void _fetchOrders() async {
    final response = await _http?.get("/api/v1/invoices");

    if (response != null) {
      Map<String, dynamic> data = jsonDecode(response.toString());

      // Check if the data has the expected structure
      if (data.containsKey('data') &&
          data['data'] is Map &&
          data['data'].containsKey('items')) {
        List<dynamic> orderItems = data['data']['items'];

        setState(() {
          // Map each JSON item to an Order object
          _orders = orderItems.map((item) => Order.fromJson(item)).toList();

          // Debug: print the number of orders loaded
          print("Loaded ${_orders.length} orders");
        });
      } else {
        print("Unexpected response format: ${data.keys}");
      }
    } else {
      print("Failed to fetch orders");
    }
  }
}
