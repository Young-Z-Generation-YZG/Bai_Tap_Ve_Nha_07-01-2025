import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:admin_flutter/pages/dashboards/orders/order-details.page.dart';

class OrdersPage extends StatefulWidget {
  const OrdersPage({super.key});

  @override
  State<StatefulWidget> createState() {
    return OrdersPageState();
  }
}

class OrdersPageState extends State<OrdersPage> {
  double? _deviceWidth, _deviceHeight;
  final TextEditingController _searchController = TextEditingController();
  String _selectedFilter = "All";

  // Sample order data
  final List<Map<String, dynamic>> orders = [
    {
      'id': 'ORD10052',
      'customer': {
        'name': 'John Doe',
        'email': 'john.doe@example.com',
        'phone': '+1 (555) 123-4567',
      },
      'date': '2023-05-15',
      'updated_at': '2023-05-15 14:30:25',
      'status': 'DELIVERED',
      'total': 127.95,
      'subtotal': 109.95,
      'shipping_fee': 10.00,
      'tax': 8.00,
      'discount': 0.00,
      'items': [
        {
          'name': 'Casual Blazer',
          'sku': 'BLZ-1001',
          'price': 109.95,
          'quantity': 1,
          'image':
              'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
          'options': {'color': 'Black', 'size': 'L'},
        },
      ],
      'shipping': {
        'address': '123 Main St, Apt 4B',
        'city': 'New York',
        'state': 'NY',
        'zip': '10001',
        'country': 'USA',
      },
      'payment': {
        'method': 'Credit Card',
        'card': '**** **** **** 4242',
        'status': 'Paid',
      },
    },
    {
      'id': 'ORD10051',
      'customer': {
        'name': 'Jane Smith',
        'email': 'jane.smith@example.com',
        'phone': '+1 (555) 987-6543',
      },
      'date': '2023-05-14',
      'updated_at': '2023-05-14 09:15:42',
      'status': 'SHIPPED',
      'total': 215.90,
      'subtotal': 189.90,
      'shipping_fee': 12.00,
      'tax': 14.00,
      'discount': 0.00,
      'items': [
        {
          'name': 'Floral Summer Dress',
          'sku': 'DRS-2055',
          'price': 79.95,
          'quantity': 1,
          'image':
              'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
          'options': {'color': 'Blue', 'size': 'M'},
        },
        {
          'name': 'Leather Jacket',
          'sku': 'JKT-3045',
          'price': 109.95,
          'quantity': 1,
          'image': 'https://images.unsplash.com/photo-1551028719-00167b16eac5',
          'options': {'color': 'Brown', 'size': 'S'},
        },
      ],
      'shipping': {
        'address': '456 Elm Street',
        'city': 'Los Angeles',
        'state': 'CA',
        'zip': '90001',
        'country': 'USA',
      },
      'payment': {
        'method': 'PayPal',
        'card': 'jane.smith@example.com',
        'status': 'Paid',
      },
    },
    {
      'id': 'ORD10050',
      'customer': {
        'name': 'Robert Johnson',
        'email': 'robert.johnson@example.com',
        'phone': '+1 (555) 444-3333',
      },
      'date': '2023-05-13',
      'updated_at': '2023-05-13 16:45:10',
      'status': 'PROCESSING',
      'total': 325.85,
      'subtotal': 289.85,
      'shipping_fee': 15.00,
      'tax': 21.00,
      'discount': 0.00,
      'items': [
        {
          'name': 'Denim Premium Jeans',
          'sku': 'JNS-4022',
          'price': 89.95,
          'quantity': 1,
          'image':
              'https://images.unsplash.com/photo-1582552938357-32b906df40cb',
          'options': {'color': 'Blue', 'size': '32'},
        },
        {
          'name': 'Casual Blazer',
          'sku': 'BLZ-1001',
          'price': 109.95,
          'quantity': 1,
          'image':
              'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
          'options': {'color': 'Black', 'size': 'XL'},
        },
        {
          'name': 'Sunflower Jumpsuit',
          'sku': 'JMP-5099',
          'price': 89.95,
          'quantity': 1,
          'image':
              'https://res.cloudinary.com/djiju7xcq/image/upload/v1729839380/Sunflower-Jumpsuit-1-690x875_dibawa.webp',
          'options': {'color': 'Yellow', 'size': 'M'},
        },
      ],
      'shipping': {
        'address': '789 Oak Drive',
        'city': 'Chicago',
        'state': 'IL',
        'zip': '60601',
        'country': 'USA',
      },
      'payment': {
        'method': 'Credit Card',
        'card': '**** **** **** 5678',
        'status': 'Paid',
      },
    },
    {
      'id': 'ORD10049',
      'customer': {
        'name': 'Emily Davis',
        'email': 'emily.davis@example.com',
        'phone': '+1 (555) 222-1111',
      },
      'date': '2023-05-12',
      'updated_at': '2023-05-12 11:20:33',
      'status': 'PENDING',
      'total': 79.95,
      'subtotal': 69.95,
      'shipping_fee': 5.00,
      'tax': 5.00,
      'discount': 0.00,
      'items': [
        {
          'name': 'Floral Summer Dress',
          'sku': 'DRS-2055',
          'price': 69.95,
          'quantity': 1,
          'image':
              'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
          'options': {'color': 'Blue', 'size': 'S'},
        },
      ],
      'shipping': {
        'address': '321 Pine Lane',
        'city': 'Miami',
        'state': 'FL',
        'zip': '33101',
        'country': 'USA',
      },
      'payment': {
        'method': 'Credit Card',
        'card': '**** **** **** 9876',
        'status': 'Pending',
      },
    },
    {
      'id': 'ORD10048',
      'customer': {
        'name': 'Michael Wilson',
        'email': 'michael.wilson@example.com',
        'phone': '+1 (555) 777-8888',
      },
      'date': '2023-05-11',
      'updated_at': '2023-05-11 15:10:05',
      'status': 'CANCELLED',
      'total': 199.90,
      'subtotal': 179.90,
      'shipping_fee': 10.00,
      'tax': 10.00,
      'discount': 0.00,
      'items': [
        {
          'name': 'Leather Jacket',
          'sku': 'JKT-3045',
          'price': 179.90,
          'quantity': 1,
          'image': 'https://images.unsplash.com/photo-1551028719-00167b16eac5',
          'options': {'color': 'Brown', 'size': 'M'},
        },
      ],
      'shipping': {
        'address': '555 Maple Avenue',
        'city': 'Boston',
        'state': 'MA',
        'zip': '02108',
        'country': 'USA',
      },
      'payment': {
        'method': 'Credit Card',
        'card': '**** **** **** 1234',
        'status': 'Refunded',
      },
    },
  ];

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
            Expanded(child: _buildOrdersList()),
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

  Widget _buildOrdersList() {
    // Filter orders based on selected filter
    final filteredOrders =
        _selectedFilter == 'All'
            ? orders
            : orders
                .where((o) => o['status'] == _selectedFilter.toUpperCase())
                .toList();

    return ListView.builder(
      padding: EdgeInsets.symmetric(horizontal: 16.0),
      itemCount: filteredOrders.length,
      itemBuilder: (context, index) {
        final order = filteredOrders[index];
        return _orderCard(order);
      },
    );
  }

  Widget _orderCard(Map<String, dynamic> order) {
    Color getStatusColor(String status) {
      switch (status) {
        case 'PENDING':
          return Colors.orange;
        case 'PROCESSING':
          return Colors.blue;
        case 'SHIPPED':
          return Colors.purple;
        case 'DELIVERED':
          return Colors.green;
        case 'CANCELLED':
          return Colors.red;
        default:
          return Colors.grey;
      }
    }

    final items = order['items'] as List;
    final totalItems = items.length;
    final color = getStatusColor(order['status']);

    return GestureDetector(
      onTap: () async {
        final updatedOrder = await Navigator.push(
          context,
          CupertinoPageRoute(
            builder: (context) => OrderDetailsPage(order: order),
          ),
        );

        // If order was updated, update state
        if (updatedOrder != null) {
          setState(() {
            // Find and update the order in the list
            final index = orders.indexWhere((o) => o['id'] == order['id']);
            if (index != -1) {
              orders[index] = updatedOrder;
            }
          });
        }
      },
      child: Container(
        margin: EdgeInsets.only(bottom: 16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          children: [
            // Order header
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Text(
                        '#${order['id']}',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      SizedBox(width: 8),
                      Container(
                        padding: EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: color.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          order['status'],
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                            color: color,
                          ),
                        ),
                      ),
                    ],
                  ),
                  Text(
                    order['date'],
                    style: TextStyle(color: Colors.grey, fontSize: 14),
                  ),
                ],
              ),
            ),
            Divider(height: 1),
            // Customer info
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                children: [
                  Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      color: Color(0xFFEEE5FF),
                      shape: BoxShape.circle,
                    ),
                    child: Center(
                      child: Icon(
                        CupertinoIcons.person,
                        color: Color(0xFF9747FF),
                        size: 20,
                      ),
                    ),
                  ),
                  SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        order['customer']['name'],
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      SizedBox(height: 4),
                      Text(
                        order['customer']['email'],
                        style: TextStyle(color: Colors.grey, fontSize: 14),
                      ),
                    ],
                  ),
                  Spacer(),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        '\$${order['total'].toStringAsFixed(2)}',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                          color: Color(0xFF9747FF),
                        ),
                      ),
                      SizedBox(height: 4),
                      Text(
                        '$totalItems ${totalItems == 1 ? 'item' : 'items'}',
                        style: TextStyle(color: Colors.grey, fontSize: 14),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            // Order items preview (just show images)
            if (totalItems > 0)
              Padding(
                padding: const EdgeInsets.only(
                  left: 16.0,
                  right: 16.0,
                  bottom: 16.0,
                ),
                child: Row(
                  children: [
                    ...List.generate(
                      totalItems > 3 ? 3 : totalItems,
                      (index) => GestureDetector(
                        onTap: () async {
                          // Navigate to order details and scroll to the specific item
                          final updatedOrder = await Navigator.push(
                            context,
                            CupertinoPageRoute(
                              builder:
                                  (context) => OrderDetailsPage(
                                    order: order,
                                    initialScrollToItem: index,
                                  ),
                            ),
                          );

                          // If order was updated, update state
                          if (updatedOrder != null) {
                            setState(() {
                              // Find and update the order in the list
                              final idx = orders.indexWhere(
                                (o) => o['id'] == order['id'],
                              );
                              if (idx != -1) {
                                orders[idx] = updatedOrder;
                              }
                            });
                          }
                        },
                        child: Container(
                          width: 50,
                          height: 50,
                          margin: EdgeInsets.only(right: 8),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(8),
                            image: DecorationImage(
                              image: NetworkImage(items[index]['image']),
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                      ),
                    ),
                    if (totalItems > 3)
                      GestureDetector(
                        onTap: () async {
                          // Navigate to order details page to see all items
                          final updatedOrder = await Navigator.push(
                            context,
                            CupertinoPageRoute(
                              builder:
                                  (context) => OrderDetailsPage(order: order),
                            ),
                          );

                          // If order was updated, update state
                          if (updatedOrder != null) {
                            setState(() {
                              // Find and update the order in the list
                              final index = orders.indexWhere(
                                (o) => o['id'] == order['id'],
                              );
                              if (index != -1) {
                                orders[index] = updatedOrder;
                              }
                            });
                          }
                        },
                        child: Container(
                          width: 50,
                          height: 50,
                          decoration: BoxDecoration(
                            color: Colors.black.withOpacity(0.6),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Center(
                            child: Text(
                              '+${totalItems - 3}',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
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
}
