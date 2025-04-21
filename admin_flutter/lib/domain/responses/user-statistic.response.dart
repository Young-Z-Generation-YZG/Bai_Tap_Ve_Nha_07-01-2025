class UserStatisticResponse {
  final Profile profile;
  final OrderSummary orderSummary;

  UserStatisticResponse({required this.profile, required this.orderSummary});

  factory UserStatisticResponse.fromJson(Map<String, dynamic> json) {
    return UserStatisticResponse(
      profile: Profile.fromJson(json['profile']),
      orderSummary: OrderSummary.fromJson(json['order_summary']),
    );
  }
}

class Profile {
  final String customerName;
  final String email;
  final String phoneNumber;
  final String avatar;

  Profile({
    required this.customerName,
    required this.email,
    required this.phoneNumber,
    required this.avatar,
  });

  factory Profile.fromJson(Map<String, dynamic> json) {
    return Profile(
      customerName: json['customer_name'] ?? '',
      email: json['email'] ?? '',
      phoneNumber: json['phone_number'] ?? '',
      avatar: json['avatar'] ?? '',
    );
  }
}

class OrderSummary {
  final double totalSpend;
  final int totalOrders;
  final Map<String, OrderStatus> orderStatus;
  final Map<String, MonthHistory> orderHistory;
  final List<OrderItem> orderList;

  OrderSummary({
    required this.totalSpend,
    required this.totalOrders,
    required this.orderStatus,
    required this.orderHistory,
    required this.orderList,
  });

  factory OrderSummary.fromJson(Map<String, dynamic> json) {
    // Parse orderStatus
    Map<String, OrderStatus> orderStatusMap = {};

    if (json['order_summary'] != null) {
      orderStatusMap["PENDING"] = OrderStatus.fromJson(
        json['order_summary']["PENDING"],
      );
      orderStatusMap["CONFIRMED"] = OrderStatus.fromJson(
        json['order_summary']["CONFIRMED"],
      );
      orderStatusMap["ON_DELIVERING"] = OrderStatus.fromJson(
        json['order_summary']["ON_DELIVERING"],
      );
      orderStatusMap["DELIVERED"] = OrderStatus.fromJson(
        json['order_summary']["DELIVERED"],
      );
    }

    // Parse orderHistory
    Map<String, MonthHistory> orderHistoryMap = {};
    if (json['order_history'] != null) {
      json['order_history'].forEach((key, value) {
        orderHistoryMap[key] = MonthHistory.fromJson(value);
      });
    }

    // Parse orderList
    List<OrderItem> orderList = [];
    if (json['order_list'] != null) {
      json['order_list'].forEach((item) {
        orderList.add(OrderItem.fromJson(item));
      });
    }

    return OrderSummary(
      totalSpend: json['total_spend']?.toDouble() ?? 0.0,
      totalOrders: json['total_orders'] ?? 0,
      orderStatus: orderStatusMap,
      orderHistory: orderHistoryMap,
      orderList: orderList,
    );
  }
}

class OrderStatus {
  final int count;
  final double revenue;

  OrderStatus({required this.count, required this.revenue});

  factory OrderStatus.fromJson(Map<String, dynamic> json) {
    return OrderStatus(
      count: json['count'] ?? 0,
      revenue: json['revenue']?.toDouble() ?? 0.0,
    );
  }
}

class MonthHistory {
  final double monthSpend;
  final int monthQuantity;

  MonthHistory({required this.monthSpend, required this.monthQuantity});

  factory MonthHistory.fromJson(Map<String, dynamic> json) {
    return MonthHistory(
      monthSpend: json['month_spend']?.toDouble() ?? 0.0,
      monthQuantity: json['month_quantity'] ?? 0,
    );
  }
}

class OrderItem {
  final String orderId;
  final String orderDate;
  final String orderStatus;
  final double orderAmount;

  OrderItem({
    required this.orderId,
    required this.orderDate,
    required this.orderStatus,
    required this.orderAmount,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      orderId: json['order_id'] ?? '',
      orderDate: json['order_date'] ?? '',
      orderStatus: json['order_status'] ?? '',
      orderAmount: json['order_amount']?.toDouble() ?? 0.0,
    );
  }
}
