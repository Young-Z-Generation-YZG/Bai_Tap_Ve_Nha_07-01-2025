class Order {
  final String id;
  final String invoiceUser;
  final String contactName;
  final String contactPhoneNumber;
  final List<OrderItem> invoiceProducts;
  final String invoiceNote;
  final String shippingAddressLine;
  final String shippingAddressDistrict;
  final String shippingAddressProvince;
  final String shippingAddressCountry;
  final String paymentMethod;
  final String invoiceStatus;
  final num invoiceTotal;
  final dynamic appliedVoucher;
  final DateTime createdAt;
  final DateTime updatedAt;

  Order({
    required this.id,
    required this.invoiceUser,
    required this.contactName,
    required this.contactPhoneNumber,
    required this.invoiceProducts,
    required this.invoiceNote,
    required this.shippingAddressLine,
    required this.shippingAddressDistrict,
    required this.shippingAddressProvince,
    required this.shippingAddressCountry,
    required this.paymentMethod,
    required this.invoiceStatus,
    required this.invoiceTotal,
    required this.appliedVoucher,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['_id'] ?? '',
      invoiceUser: json['invoice_user'] ?? '',
      contactName: json['contact_name'] ?? '',
      contactPhoneNumber: json['contact_phone_number'] ?? '',
      invoiceProducts:
          (json['invoice_products'] as List<dynamic>)
              .map((item) => OrderItem.fromJson(item as Map<String, dynamic>))
              .toList(),
      invoiceNote: json['invoice_note'] ?? '',
      shippingAddressLine: json['shipping_address_line'] ?? '',
      shippingAddressDistrict: json['shipping_address_district'] ?? '',
      shippingAddressProvince: json['shipping_address_province'] ?? '',
      shippingAddressCountry: json['shipping_address_country'] ?? '',
      paymentMethod: json['payment_method'] ?? '',
      invoiceStatus: json['invoice_status'] ?? '',
      invoiceTotal: json['invoice_total'] ?? 0,
      appliedVoucher: json['applied_voucher'] ?? null,
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
    );
  }
}

class OrderItem {
  final String productId;
  final String productName;
  final String productSize;
  final String productColor;
  final String productImage;
  final num productPrice;
  final int quantity;
  final num productSubTotalPrice;
  final dynamic promotion;

  OrderItem({
    required this.productId,
    required this.productName,
    required this.productSize,
    required this.productColor,
    required this.productImage,
    required this.productPrice,
    required this.quantity,
    required this.productSubTotalPrice,
    required this.promotion,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      productId: json['product_id'] ?? '',
      productName: json['product_name'] ?? '',
      productSize: json['product_size'] ?? '',
      productColor: json['product_color'] ?? '',
      productImage: json['product_image'] ?? '',
      productPrice: json['product_price'] ?? 0,
      quantity: json['quantity'] ?? 0,
      productSubTotalPrice: json['product_sub_total_price'] ?? 0,
      promotion: json['promotion'] ?? null,
    );
  }
}
