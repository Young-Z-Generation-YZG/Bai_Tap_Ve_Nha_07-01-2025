import 'dart:convert';

import 'package:admin_flutter/domain/app-notification.dart';
import 'package:admin_flutter/domain/constants/filter.constant.dart';
import 'package:admin_flutter/services/http.service.dart';
import 'package:admin_flutter/services/socket.service.dart';
import 'package:admin_flutter/widgets/invoice-noti.widget.dart';
import 'package:admin_flutter/widgets/review-noti.widget.dart';
import 'package:flutter/cupertino.dart';
import 'package:get_it/get_it.dart';

class NotifyPageV2 extends StatefulWidget {
  const NotifyPageV2({super.key});

  @override
  State<NotifyPageV2> createState() {
    return NotifyPageV2State();
  }
}

class NotifyPageV2State extends State<NotifyPageV2> {
  late HttpService? _http;
  late SocketService _socketService;

  double? _deviceWidth, _deviceHeight;

  List<AppNotification> _notifications = [];

  String _filterOption = 'ALL'; // Options: 'All', 'Orders', 'Reviews'

  @override
  void initState() {
    super.initState();

    _http = GetIt.instance.get<HttpService>();
    _socketService = GetIt.instance.get<SocketService>();
    _fetchNotifications();

    if (!_socketService.isConnected) {
      _socketService.initializeSocket();

      _socketService.socket.on('admin-notification', (data) {
        print('Admin notification received: $data');

        final noti = _socketService.processNotification(data);

        if (noti != null) {
          setState(() {
            _notifications.insert(0, noti);
          });
        }
      });
    }
  }

  // @override
  // void dispose() {
  //   // No need to dispose the subscription as it's automatically handled when the widget is disposed
  //   super.dispose();
  // }

  @override
  Widget build(BuildContext context) {
    _deviceWidth = MediaQuery.of(context).size.width;
    _deviceHeight = MediaQuery.of(context).size.height;

    return CupertinoPageScaffold(
      backgroundColor: CupertinoColors.systemGroupedBackground,
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
              onPressed: () => {},
            ),
          ],
        ),
      ),
      child: SafeArea(
        child: Column(
          children: [
            _filterSection(),
            Expanded(
              child: Container(
                margin: EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                decoration: BoxDecoration(
                  // color: Colors.white,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: _notificationList(),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _filterSection() {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      child: Row(
        children: [
          Expanded(
            child: CupertinoSlidingSegmentedControl<String>(
              groupValue: _filterOption,
              children: {
                'ALL': Text('All'),
                'INVOICE': Text('Orders'),
                'REVIEW': Text('Reviews'),
              },
              onValueChanged: (value) {
                setState(() {
                  _filterOption = value!;
                });
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _notificationList() {
    List<AppNotification> filteredNotifications = _notifications;

    if (_filterOption == FILTER_CONSTANTS.INVOICE) {
      filteredNotifications =
          filteredNotifications.where((r) => r.type == 'INVOICE').toList();
    } else if (_filterOption == FILTER_CONSTANTS.REVIEW) {
      filteredNotifications =
          filteredNotifications.where((r) => r.type == 'REVIEW').toList();
    }

    if (_filterOption == FILTER_CONSTANTS.INVOICE) {
      return ListView.builder(
        itemCount: filteredNotifications.length,
        itemBuilder: (context, index) {
          return InvoiceNotificationItem(
            orderNotification: filteredNotifications[index],
          );
        },
      );
    } else if (_filterOption == FILTER_CONSTANTS.REVIEW) {
      return ListView.builder(
        itemCount: filteredNotifications.length,
        itemBuilder: (context, index) {
          return ReviewNotificationItem(
            orderNotification: filteredNotifications[index],
          );
        },
      );
    } else if (_filterOption == FILTER_CONSTANTS.ALL) {
      // Sort notifications by date (newest first)
      filteredNotifications.sort((a, b) => b.createdAt.compareTo(a.createdAt));

      return ListView.builder(
        itemCount: filteredNotifications.length,
        itemBuilder: (context, index) {
          return filteredNotifications[index].type == 'INVOICE'
              ? InvoiceNotificationItem(
                orderNotification: filteredNotifications[index],
              )
              : ReviewNotificationItem(
                orderNotification: filteredNotifications[index],
              );
        },
      );
    }

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

  void _fetchNotifications() async {
    final response = await _http?.get(
      "/api/v1/notifications/admin?_limit=30&_page=1&_type=ALL",
    );

    if (response != null) {
      Map<String, dynamic> data = jsonDecode(response.toString());

      // Check if the data has the expected structure
      if (data.containsKey('data') &&
          data['data'] is Map &&
          data['data'].containsKey('items')) {
        List<dynamic> notificationItems = data['data']['items'];

        setState(() {
          // Map each JSON item to a Notification object
          _notifications =
              notificationItems
                  .map((item) => AppNotification.fromJson(item))
                  .toList();
        });
      }
    }
  }
}
