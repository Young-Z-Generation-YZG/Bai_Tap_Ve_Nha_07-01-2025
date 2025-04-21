import 'package:admin_flutter/domain/app-notification.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class InvoiceNotificationItem extends StatelessWidget {
  final AppNotification orderNotification;

  const InvoiceNotificationItem({required this.orderNotification});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      child: Container(
        margin: EdgeInsets.symmetric(vertical: 7),
        decoration: BoxDecoration(
          color: CupertinoColors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withAlpha(10),
              blurRadius: 8,
              offset: Offset(0, 2),
            ),
          ],
          border:
              orderNotification.isRead
                  ? null
                  : Border.all(color: Color(0xFF47B5FF), width: 1),
        ),
        child: Column(
          children: [
            Container(
              padding: EdgeInsets.all(12),
              decoration: BoxDecoration(
                color:
                    orderNotification.isRead
                        ? CupertinoColors.systemGrey6
                        : Color(0xFFEAF6FF),
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
                      color: Color(0xFF47B5FF).withAlpha(15),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Center(
                      child: Icon(
                        CupertinoIcons.cart_fill,
                        color: Color(0xFF47B5FF),
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
                          orderNotification.invoiceInfo?.label.toUpperCase() ??
                              '',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: CupertinoColors.black,
                          ),
                        ),
                        SizedBox(height: 2),
                        Text(
                          _formatDateTime(orderNotification.createdAt),
                          style: TextStyle(
                            fontSize: 12,
                            color: CupertinoColors.systemGrey,
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (!orderNotification.isRead)
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
                          orderNotification.invoiceInfo?.message ?? "",
                          style: TextStyle(
                            fontSize: 15,
                            color: CupertinoColors.black,
                          ),
                        ),
                        SizedBox(height: 8),
                        Container(
                          padding: EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            color: CupertinoColors.systemGrey6,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Column(
                            children: [
                              _buildDetailRow(
                                'Order ID',
                                orderNotification.id.toString(),
                              ),
                              SizedBox(height: 4),
                              _buildDetailRow(
                                'Amount',
                                '\$${orderNotification.invoiceInfo?.amount.toStringAsFixed(2) ?? '0.00'}',
                              ),
                              SizedBox(height: 4),
                              _buildDetailRow(
                                'Items',
                                orderNotification.invoiceInfo?.unit ?? 0,
                              ),
                              SizedBox(height: 4),
                              _buildDetailRow(
                                'Customer',
                                orderNotification.invoiceInfo?.customerName ??
                                    "Foo Bar",
                              ),
                            ],
                          ),
                        ),
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
                  if (!false)
                    CupertinoButton(
                      padding: EdgeInsets.zero,
                      child: Text(
                        'Mark as read',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: Color(0xFF47B5FF),
                        ),
                      ),
                      onPressed: () => {},
                    ),
                  SizedBox(width: 12),
                  CupertinoButton(
                    padding: EdgeInsets.zero,
                    child: Text(
                      'View Order',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF47B5FF),
                      ),
                    ),
                    onPressed: () => {},
                  ),
                ],
              ),
            ),
          ],
        ),
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

  String _formatDateTime(DateTime dateTime) {
    return "${dateTime.year}-${dateTime.month.toString().padLeft(2, '0')}-${dateTime.day.toString().padLeft(2, '0')} ${dateTime.hour.toString().padLeft(2, '0')}:${dateTime.minute.toString().padLeft(2, '0')}";
  }
}
