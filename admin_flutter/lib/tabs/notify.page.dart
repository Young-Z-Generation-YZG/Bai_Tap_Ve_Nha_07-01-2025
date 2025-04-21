import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class NotifyPage extends StatefulWidget {
  const NotifyPage({super.key});

  @override
  State<StatefulWidget> createState() {
    return NotifyPageState();
  }
}

class NotifyPageState extends State<NotifyPage> {
  double? _deviceWidth, _deviceHeight;

  // Sample notification data
  final List<Map<String, dynamic>> _notifications = [
    {
      'id': '1',
      'type': 'order',
      'title': 'New Order Placed',
      'message': 'Order #12345 has been placed for \$185.00',
      'time': DateTime.now().subtract(Duration(minutes: 5)),
      'isRead': false,
      'data': {
        'orderId': '12345',
        'amount': 185.00,
        'items': 3,
        'customer': 'John Smith',
      },
    },
    {
      'id': '2',
      'type': 'review',
      'title': 'New Product Review',
      'message': 'Blue Denim Jacket received a 5-star review',
      'time': DateTime.now().subtract(Duration(hours: 2)),
      'isRead': false,
      'data': {
        'productId': '789',
        'productName': 'Blue Denim Jacket',
        'rating': 5,
        'reviewer': 'Emma Davis',
        'comment': 'Great quality and perfect fit! Would definitely recommend.',
      },
    },
    {
      'id': '3',
      'type': 'order',
      'title': 'New Order Placed',
      'message': 'Order #12346 has been placed for \$75.50',
      'time': DateTime.now().subtract(Duration(hours: 6)),
      'isRead': true,
      'data': {
        'orderId': '12346',
        'amount': 75.50,
        'items': 1,
        'customer': 'Alice Johnson',
      },
    },
    {
      'id': '4',
      'type': 'review',
      'title': 'New Product Review',
      'message': 'White Casual T-Shirt received a 4-star review',
      'time': DateTime.now().subtract(Duration(hours: 8)),
      'isRead': true,
      'data': {
        'productId': '456',
        'productName': 'White Casual T-Shirt',
        'rating': 4,
        'reviewer': 'Michael Brown',
        'comment': 'Good quality fabric but runs slightly small.',
      },
    },
    {
      'id': '5',
      'type': 'order',
      'title': 'New Order Placed',
      'message': 'Order #12347 has been placed for \$240.00',
      'time': DateTime.now().subtract(Duration(days: 1)),
      'isRead': true,
      'data': {
        'orderId': '12347',
        'amount': 240.00,
        'items': 4,
        'customer': 'Robert Wilson',
      },
    },
    {
      'id': '6',
      'type': 'review',
      'title': 'New Product Review',
      'message': 'Black Formal Shoes received a 3-star review',
      'time': DateTime.now().subtract(Duration(days: 1, hours: 5)),
      'isRead': true,
      'data': {
        'productId': '123',
        'productName': 'Black Formal Shoes',
        'rating': 3,
        'reviewer': 'Sarah Miller',
        'comment': 'Decent quality but uncomfortable after prolonged wear.',
      },
    },
  ];

  // Filter options
  String _filterOption = 'All'; // Options: 'All', 'Orders', 'Reviews'

  @override
  Widget build(BuildContext context) {
    _deviceWidth = MediaQuery.of(context).size.width;
    _deviceHeight = MediaQuery.of(context).size.height;

    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Notifications'),
        backgroundColor: CupertinoColors.systemBackground,
        border: null,
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            CupertinoButton(
              padding: EdgeInsets.zero,
              child: Icon(CupertinoIcons.check_mark_circled, size: 22),
              onPressed: _markAllAsRead,
            ),
          ],
        ),
      ),
      backgroundColor: CupertinoColors.systemGroupedBackground,
      child: SafeArea(
        child: Column(
          children: [
            _buildFilterSection(),
            Expanded(child: _buildNotificationsList()),
          ],
        ),
      ),
    );
  }

  Widget _buildFilterSection() {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      color: CupertinoColors.systemBackground,
      child: Row(
        children: [
          Text(
            'Filter:',
            style: TextStyle(
              color: CupertinoColors.systemGrey,
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(width: 10),
          CupertinoSlidingSegmentedControl<String>(
            groupValue: _filterOption,
            children: {
              'All': Text('All'),
              'Orders': Text('Orders'),
              'Reviews': Text('Reviews'),
            },
            onValueChanged: (value) {
              setState(() {
                _filterOption = value!;
              });
            },
          ),
        ],
      ),
    );
  }

  Widget _buildNotificationsList() {
    // Filter notifications based on the selected filter option
    List<Map<String, dynamic>> filteredNotifications = _notifications;
    if (_filterOption == 'Orders') {
      filteredNotifications =
          _notifications.where((n) => n['type'] == 'order').toList();
    } else if (_filterOption == 'Reviews') {
      filteredNotifications =
          _notifications.where((n) => n['type'] == 'review').toList();
    }

    if (filteredNotifications.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              CupertinoIcons.bell_slash,
              size: 60,
              color: CupertinoColors.systemGrey3,
            ),
            SizedBox(height: 16),
            Text(
              'No notifications',
              style: TextStyle(
                fontSize: 18,
                color: CupertinoColors.systemGrey,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      itemCount: filteredNotifications.length,
      itemBuilder: (context, index) {
        final notification = filteredNotifications[index];
        return _buildNotificationItem(notification);
      },
    );
  }

  Widget _buildNotificationItem(Map<String, dynamic> notification) {
    final bool isRead = notification['isRead'] as bool;
    final String type = notification['type'] as String;
    final DateTime time = notification['time'] as DateTime;

    // Format time
    String timeText = _formatTimeAgo(time);

    return GestureDetector(
      onTap: () => _onNotificationTap(notification),
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isRead ? CupertinoColors.white : Color(0xFFF0F8FF),
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 8,
              offset: Offset(0, 2),
            ),
          ],
          border:
              isRead ? null : Border.all(color: Color(0xFF47B5FF), width: 1),
        ),
        child: Column(
          children: [
            // Header section
            Container(
              padding: EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: isRead ? CupertinoColors.systemGrey6 : Color(0xFFEAF6FF),
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(12),
                  topRight: Radius.circular(12),
                ),
              ),
              child: Row(
                children: [
                  // Icon
                  Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      color:
                          type == 'order'
                              ? Color(0xFF47B5FF).withOpacity(0.15)
                              : Color(0xFF9747FF).withOpacity(0.15),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Center(
                      child: Icon(
                        type == 'order'
                            ? CupertinoIcons.cart_fill
                            : CupertinoIcons.star_fill,
                        color:
                            type == 'order'
                                ? Color(0xFF47B5FF)
                                : Color(0xFF9747FF),
                        size: 22,
                      ),
                    ),
                  ),
                  SizedBox(width: 12),
                  // Title and time
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          notification['title'],
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: CupertinoColors.black,
                          ),
                        ),
                        SizedBox(height: 2),
                        Text(
                          timeText,
                          style: TextStyle(
                            fontSize: 12,
                            color: CupertinoColors.systemGrey,
                          ),
                        ),
                      ],
                    ),
                  ),
                  // Unread indicator
                  if (!isRead)
                    Container(
                      width: 10,
                      height: 10,
                      decoration: BoxDecoration(
                        color: Color(0xFF47B5FF),
                        shape: BoxShape.circle,
                      ),
                    ),
                ],
              ),
            ),
            // Content section
            Padding(
              padding: EdgeInsets.all(12),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(width: 6),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          notification['message'],
                          style: TextStyle(
                            fontSize: 15,
                            color: CupertinoColors.black,
                          ),
                        ),
                        SizedBox(height: 8),
                        _buildNotificationDetails(notification),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            // Action button section
            Container(
              padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: BoxDecoration(
                color: CupertinoColors.systemGrey6,
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(12),
                  bottomRight: Radius.circular(12),
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  if (!isRead)
                    CupertinoButton(
                      padding: EdgeInsets.zero,
                      child: Text(
                        'Mark as read',
                        style: TextStyle(
                          fontSize: 14,
                          color: Color(0xFF47B5FF),
                        ),
                      ),
                      onPressed: () => _markAsRead(notification['id']),
                    ),
                  SizedBox(width: 12),
                  CupertinoButton(
                    padding: EdgeInsets.zero,
                    child: Text(
                      type == 'order' ? 'View Order' : 'View Product',
                      style: TextStyle(
                        fontSize: 14,
                        color:
                            type == 'order'
                                ? Color(0xFF47B5FF)
                                : Color(0xFF9747FF),
                      ),
                    ),
                    onPressed: () => _viewDetails(notification),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNotificationDetails(Map<String, dynamic> notification) {
    final type = notification['type'] as String;
    final data = notification['data'] as Map<String, dynamic>;

    if (type == 'order') {
      return Container(
        padding: EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: CupertinoColors.systemGrey6,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Column(
          children: [
            _buildDetailRow('Order ID', '#${data['orderId']}'),
            SizedBox(height: 4),
            _buildDetailRow('Amount', '\$${data['amount'].toStringAsFixed(2)}'),
            SizedBox(height: 4),
            _buildDetailRow('Items', data['items'].toString()),
            SizedBox(height: 4),
            _buildDetailRow('Customer', data['customer']),
          ],
        ),
      );
    } else {
      return Column(
        children: [
          Container(
            padding: EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: CupertinoColors.systemGrey6,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Column(
              children: [
                _buildDetailRow('Product', data['productName']),
                SizedBox(height: 4),
                _buildDetailRow('Rating', _buildRatingStars(data['rating'])),
                SizedBox(height: 4),
                _buildDetailRow('Reviewer', data['reviewer']),
              ],
            ),
          ),
          SizedBox(height: 8),
          Container(
            width: double.infinity,
            padding: EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: CupertinoColors.systemGrey6,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Comment:',
                  style: TextStyle(
                    fontSize: 13,
                    color: CupertinoColors.systemGrey,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                SizedBox(height: 4),
                Text(
                  data['comment'],
                  style: TextStyle(fontSize: 14, color: CupertinoColors.black),
                ),
              ],
            ),
          ),
        ],
      );
    }
  }

  Widget _buildDetailRow(String label, dynamic value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          '$label:',
          style: TextStyle(
            fontSize: 13,
            color: CupertinoColors.systemGrey,
            fontWeight: FontWeight.w500,
          ),
        ),
        if (value is String || value is num)
          Text(
            value.toString(),
            style: TextStyle(
              fontSize: 13,
              color: CupertinoColors.black,
              fontWeight: FontWeight.w500,
            ),
          )
        else
          value,
      ],
    );
  }

  Widget _buildRatingStars(int rating) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(5, (index) {
        return Icon(
          index < rating ? CupertinoIcons.star_fill : CupertinoIcons.star,
          color:
              index < rating ? Color(0xFFFFD700) : CupertinoColors.systemGrey3,
          size: 14,
        );
      }),
    );
  }

  String _formatTimeAgo(DateTime time) {
    final now = DateTime.now();
    final difference = now.difference(time);

    if (difference.inSeconds < 60) {
      return 'Just now';
    } else if (difference.inMinutes < 60) {
      return '${difference.inMinutes} min ago';
    } else if (difference.inHours < 24) {
      return '${difference.inHours} hr ago';
    } else if (difference.inDays < 7) {
      return '${difference.inDays} day${difference.inDays == 1 ? '' : 's'} ago';
    } else {
      return '${time.month}/${time.day}/${time.year}';
    }
  }

  void _onNotificationTap(Map<String, dynamic> notification) {
    if (!notification['isRead']) {
      _markAsRead(notification['id']);
    }

    // Show notification details in a modal
    showCupertinoModalPopup(
      context: context,
      builder: (context) => _buildNotificationDetailModal(notification),
    );
  }

  Widget _buildNotificationDetailModal(Map<String, dynamic> notification) {
    final type = notification['type'] as String;
    final data = notification['data'] as Map<String, dynamic>;

    return CupertinoActionSheet(
      title: Text(notification['title']),
      message: Text(notification['message']),
      actions: [
        CupertinoActionSheetAction(
          child: Text(
            type == 'order' ? 'View Order Details' : 'View Product Details',
            style: TextStyle(
              color: type == 'order' ? Color(0xFF47B5FF) : Color(0xFF9747FF),
            ),
          ),
          onPressed: () {
            Navigator.pop(context);
            _viewDetails(notification);
          },
        ),
        if (type == 'order')
          CupertinoActionSheetAction(
            child: Text('Update Order Status'),
            onPressed: () {
              Navigator.pop(context);
              // Navigate to order update page
            },
          ),
        if (type == 'review')
          CupertinoActionSheetAction(
            child: Text('Reply to Review'),
            onPressed: () {
              Navigator.pop(context);
              // Navigate to review reply page
            },
          ),
      ],
      cancelButton: CupertinoActionSheetAction(
        child: Text('Dismiss'),
        onPressed: () => Navigator.pop(context),
      ),
    );
  }

  void _markAsRead(String notificationId) {
    setState(() {
      final index = _notifications.indexWhere((n) => n['id'] == notificationId);
      if (index != -1) {
        _notifications[index]['isRead'] = true;
      }
    });
  }

  void _markAllAsRead() {
    setState(() {
      for (var notification in _notifications) {
        notification['isRead'] = true;
      }
    });
  }

  void _viewDetails(Map<String, dynamic> notification) {
    // Navigate to the appropriate details page
    final type = notification['type'] as String;
    final data = notification['data'] as Map<String, dynamic>;

    if (type == 'order') {
      // Navigate to order details page
      print('Navigating to order #${data['orderId']} details');
    } else {
      // Navigate to product details page
      print('Navigating to product #${data['productId']} details');
    }
  }
}
