import 'package:admin_flutter/domain/app-notification.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ReviewNotificationItem extends StatelessWidget {
  final AppNotification orderNotification;

  const ReviewNotificationItem({required this.orderNotification});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      child: Container(
        margin: EdgeInsets.symmetric(vertical: 7),
        decoration: BoxDecoration(
          color:
              orderNotification.isRead
                  ? CupertinoColors.white
                  : Color(0xFFF0F8FF),
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
                      color: Color(0xFF9747FF).withAlpha(15),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Center(
                      child: Icon(
                        CupertinoIcons.star_fill,
                        color: Color(0xFF9747FF),
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
                          orderNotification.reviewInfo?.label.toUpperCase() ??
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
                        Container(
                          padding: EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            color: CupertinoColors.systemGrey6,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Column(
                            children: [
                              _buildDetailRow(
                                'Product',
                                orderNotification.reviewInfo?.productName,
                              ),
                              SizedBox(height: 4),
                              _buildDetailRow(
                                'Rating',
                                _buildRatingStars(
                                  orderNotification.reviewInfo?.rating ?? 5,
                                ),
                              ),
                              SizedBox(height: 4),
                              _buildDetailRow(
                                'Reviewer',
                                orderNotification.reviewInfo?.customerName,
                              ),
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
                                orderNotification.reviewInfo?.content ?? "",
                                style: TextStyle(
                                  fontSize: 14,
                                  color: CupertinoColors.black,
                                ),
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
                      'View Product',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF9747FF),
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

  String _formatDateTime(DateTime dateTime) {
    return "${dateTime.year}-${dateTime.month.toString().padLeft(2, '0')}-${dateTime.day.toString().padLeft(2, '0')} ${dateTime.hour.toString().padLeft(2, '0')}:${dateTime.minute.toString().padLeft(2, '0')}";
  }
}
