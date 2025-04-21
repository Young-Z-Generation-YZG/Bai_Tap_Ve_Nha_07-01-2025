class InvoiceInfo {
  final String label;
  final String message;
  final String invoiceId;
  final String invoiceCode;
  final String customerId;
  final String customerName;
  final double amount;
  final int unit;
  final String status;
  final DateTime createdAt;
  final DateTime updatedAt;

  InvoiceInfo({
    required this.label,
    required this.message,
    required this.invoiceId,
    required this.invoiceCode,
    required this.customerId,
    required this.customerName,
    required this.amount,
    required this.unit,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
  });

  factory InvoiceInfo.fromJson(Map<String, dynamic> json) {
    return InvoiceInfo(
      label: json['label'] ?? '',
      message: json['message'] ?? '',
      invoiceId: json['invoice_id'] ?? '',
      invoiceCode: json['invoice_code'] ?? '',
      customerId: json['customer_id'] ?? '',
      customerName: json['customer_name'] ?? '',
      amount: json['amount']?.toDouble() ?? 0.0,
      unit: json['unit']?.toInt() ?? 0,
      status: json['status'] ?? '',
      createdAt:
          json['createdAt'] != null
              ? DateTime.parse(json['createdAt'])
              : DateTime.now(),
      updatedAt:
          json['updatedAt'] != null
              ? DateTime.parse(json['updatedAt'])
              : DateTime.now(),
    );
  }
}

class ReviewInfo {
  final String label;
  final String message;
  final String reviewId;
  final int rating;
  final String content;
  final String userId;
  final String customerName;
  final String productId;
  final String productName;
  final String productImage;
  final String invoiceCode;
  final DateTime createdAt;
  final DateTime updatedAt;

  ReviewInfo({
    required this.label,
    required this.message,
    required this.reviewId,
    required this.rating,
    required this.content,
    required this.userId,
    required this.customerName,
    required this.productId,
    required this.productName,
    required this.productImage,
    required this.invoiceCode,
    required this.createdAt,
    required this.updatedAt,
  });

  factory ReviewInfo.fromJson(Map<String, dynamic> json) {
    return ReviewInfo(
      label: json['label'] ?? '',
      message: json['message'] ?? '',
      reviewId: json['review_id'] ?? '',
      rating: json['rating']?.toInt() ?? 0,
      content: json['content'] ?? '',
      userId: json['user_id'] ?? '',
      customerName: json['customer_name'] ?? '',
      productId: json['product_id'] ?? '',
      productName: json['product_name'] ?? '',
      productImage: json['product_image'] ?? '',
      invoiceCode: json['invoice_code'] ?? '',
      createdAt:
          json['createdAt'] != null
              ? DateTime.parse(json['createdAt'])
              : DateTime.now(),
      updatedAt:
          json['updatedAt'] != null
              ? DateTime.parse(json['updatedAt'])
              : DateTime.now(),
    );
  }
}

class AppNotification {
  final String id;
  final String? recipient;
  final String? sender;
  final String type;
  final InvoiceInfo? invoiceInfo;
  final ReviewInfo? reviewInfo;
  final bool isRead;
  final DateTime? readAt;
  final bool isDeleted;
  final DateTime createdAt;
  final DateTime updatedAt;

  AppNotification({
    required this.id,
    this.recipient,
    this.sender,
    required this.type,
    this.invoiceInfo,
    this.reviewInfo,
    required this.isRead,
    this.readAt,
    required this.isDeleted,
    required this.createdAt,
    required this.updatedAt,
  });

  factory AppNotification.fromJson(Map<String, dynamic> json) {
    return AppNotification(
      id: json['_id'] ?? json['id'] ?? '',
      recipient: json['recipient'],
      sender: json['sender'],
      type: json['type'] ?? '',
      invoiceInfo:
          json['invoice_info'] != null
              ? InvoiceInfo.fromJson(json['invoice_info'])
              : null,
      reviewInfo:
          json['review_info'] != null
              ? ReviewInfo.fromJson(json['review_info'])
              : null,
      isRead: json['is_read'] ?? false,
      readAt: json['read_at'] != null ? DateTime.parse(json['read_at']) : null,
      isDeleted: json['is_deleted'] ?? false,
      createdAt:
          json['createdAt'] != null
              ? DateTime.parse(json['createdAt'])
              : DateTime.now(),
      updatedAt:
          json['updatedAt'] != null
              ? DateTime.parse(json['updatedAt'])
              : DateTime.now(),
    );
  }
}
