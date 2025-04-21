import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

// Add String extension for capitalize method
extension StringExtension on String {
  String capitalize() {
    return "${this[0].toUpperCase()}${this.substring(1)}";
  }
}

class OrderDetailsPage extends StatefulWidget {
  final Map<String, dynamic> order;
  final int? initialScrollToItem;

  const OrderDetailsPage({
    Key? key,
    required this.order,
    this.initialScrollToItem,
  }) : super(key: key);

  @override
  _OrderDetailsPageState createState() => _OrderDetailsPageState();
}

class _OrderDetailsPageState extends State<OrderDetailsPage> {
  late String _currentStatus;
  bool _isEditingStatus = false;

  // Scroll controller for order items
  late ScrollController _scrollController;

  // Order status options
  final List<String> _orderStatuses = [
    'PENDING',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
    'REFUNDED',
  ];

  @override
  void initState() {
    super.initState();
    _currentStatus = widget.order['status'] ?? 'PENDING';
    _scrollController = ScrollController();

    // If initialScrollToItem is provided, scroll to that item after layout
    if (widget.initialScrollToItem != null) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _scrollToItem(widget.initialScrollToItem!);
      });
    }
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  // Method to scroll to a specific item
  void _scrollToItem(int index) {
    // Find the key for the order items section
    final orderItemsKey = GlobalKey();

    // Calculate approximate position for the item (each item ~100px height)
    // This is a simple approximation, adjust based on actual item height
    final itemsOffset =
        orderItemsKey.currentContext?.findRenderObject()?.paintBounds.top ?? 0;
    final itemHeight = 100.0; // Approximate item height
    final offset = itemsOffset + (index * itemHeight);

    // Scroll to the position with animation
    _scrollController.animateTo(
      offset,
      duration: Duration(milliseconds: 500),
      curve: Curves.easeInOut,
    );
  }

  @override
  Widget build(BuildContext context) {
    final totalItems = (widget.order['items'] as List).length;
    final total = widget.order['total'] ?? 0.0;

    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Order #${widget.order['id']}'),
        backgroundColor: CupertinoColors.systemGroupedBackground,
        border: null,
        leading: CupertinoNavigationBarBackButton(
          onPressed: () => Navigator.pop(context),
        ),
        trailing: CupertinoButton(
          padding: EdgeInsets.zero,
          child: Icon(
            CupertinoIcons.printer,
            color: CupertinoColors.activeBlue,
          ),
          onPressed: () {
            // Implement print functionality
          },
        ),
      ),
      backgroundColor: CupertinoColors.systemGroupedBackground,
      child: SafeArea(
        child: ListView(
          controller: _scrollController,
          children: [
            // Order Status Section
            _buildOrderStatusSection(),

            SizedBox(height: 16),

            // Customer Information
            _buildInfoSection('Customer Information', [
              _buildInfoItem(
                'Name',
                widget.order['customer']['name'] ?? 'Unknown',
              ),
              _buildInfoItem(
                'Email',
                widget.order['customer']['email'] ?? 'Not provided',
              ),
              _buildInfoItem(
                'Phone',
                widget.order['customer']['phone'] ?? 'Not provided',
              ),
            ]),

            SizedBox(height: 16),

            // Shipping Information
            _buildInfoSection('Shipping Address', [
              _buildMultiLineInfoItem(
                '''${widget.order['shipping']['address'] ?? ''}
${widget.order['shipping']['city'] ?? ''}, ${widget.order['shipping']['state'] ?? ''} ${widget.order['shipping']['zip'] ?? ''}
${widget.order['shipping']['country'] ?? ''}''',
              ),
            ]),

            SizedBox(height: 16),

            // Payment Information
            _buildInfoSection('Payment Information', [
              _buildInfoItem(
                'Method',
                widget.order['payment']['method'] ?? 'Unknown',
              ),
              _buildInfoItem(
                'Card',
                widget.order['payment']['card'] ?? 'Not provided',
              ),
              _buildInfoItem(
                'Status',
                widget.order['payment']['status'] ?? 'Unknown',
              ),
            ]),

            SizedBox(height: 16),

            // Order Items
            _buildOrderItems(),

            SizedBox(height: 16),

            // Order Summary
            _buildInfoSection('Order Summary', [
              _buildInfoItem(
                'Subtotal',
                '\$${widget.order['subtotal']?.toStringAsFixed(2) ?? '0.00'}',
              ),
              _buildInfoItem(
                'Shipping',
                '\$${widget.order['shipping_fee']?.toStringAsFixed(2) ?? '0.00'}',
              ),
              _buildInfoItem(
                'Tax',
                '\$${widget.order['tax']?.toStringAsFixed(2) ?? '0.00'}',
              ),
              _buildInfoItem(
                'Discount',
                '-\$${widget.order['discount']?.toStringAsFixed(2) ?? '0.00'}',
              ),
              _buildTotalItem('Total', '\$${total.toStringAsFixed(2)}'),
            ]),

            SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildOrderItems() {
    final items = widget.order['items'] as List;

    return Container(
      key: GlobalKey(), // Add key for scrolling
      margin: EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: CupertinoColors.white,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(left: 16, top: 16, bottom: 8),
            child: Text(
              'Order Items (${items.length})',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: CupertinoColors.black,
              ),
            ),
          ),
          ListView.builder(
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
            itemCount: items.length,
            itemBuilder: (context, index) {
              final item = items[index];
              return _buildOrderItem(item);
            },
          ),
        ],
      ),
    );
  }

  Widget _buildOrderStatusSection() {
    return Container(
      margin: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: CupertinoColors.white,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 5,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(left: 16, top: 16, right: 16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Order Status',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: CupertinoColors.black,
                  ),
                ),
                CupertinoButton(
                  padding: EdgeInsets.zero,
                  child: Text(
                    _isEditingStatus ? 'Done' : 'Change',
                    style: TextStyle(color: CupertinoColors.activeBlue),
                  ),
                  onPressed: () {
                    if (_isEditingStatus) {
                      // Save the updated status
                      final updatedOrder = Map<String, dynamic>.from(
                        widget.order,
                      );
                      updatedOrder['status'] = _currentStatus;
                      Navigator.pop(context, updatedOrder);
                    } else {
                      // Toggle edit mode
                      setState(() {
                        _isEditingStatus = true;
                      });
                    }
                  },
                ),
              ],
            ),
          ),
          _isEditingStatus ? _buildStatusSelector() : _buildCurrentStatus(),
        ],
      ),
    );
  }

  Widget _buildCurrentStatus() {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildStatusChip(_currentStatus),
          SizedBox(height: 8),
          Text(
            'Last updated: ${widget.order['updated_at'] ?? 'Unknown'}',
            style: TextStyle(fontSize: 13, color: CupertinoColors.systemGrey),
          ),
        ],
      ),
    );
  }

  Widget _buildStatusSelector() {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(16),
      child: Wrap(
        spacing: 10,
        runSpacing: 10,
        children:
            _orderStatuses.map((status) {
              final isSelected = status == _currentStatus;
              return GestureDetector(
                onTap: () {
                  setState(() {
                    _currentStatus = status;
                  });
                },
                child: _buildStatusChip(status, isSelected: isSelected),
              );
            }).toList(),
      ),
    );
  }

  Widget _buildStatusChip(String status, {bool isSelected = false}) {
    Color getStatusColor() {
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
        case 'REFUNDED':
          return Colors.brown;
        default:
          return Colors.grey;
      }
    }

    final color = getStatusColor();

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: isSelected ? color : color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color, width: 1),
      ),
      child: Text(
        status,
        style: TextStyle(
          color: isSelected ? Colors.white : color,
          fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
          fontSize: 14,
        ),
      ),
    );
  }

  Widget _buildOrderItem(Map<String, dynamic> item) {
    return GestureDetector(
      onTap: () {
        _showItemDetailsModal(item);
      },
      child: Container(
        padding: EdgeInsets.all(16),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(color: CupertinoColors.systemGrey5, width: 0.5),
          ),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Product image
            Container(
              width: 70,
              height: 70,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                image: DecorationImage(
                  image: NetworkImage(
                    item['image'] ?? 'https://via.placeholder.com/70',
                  ),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            SizedBox(width: 12),
            // Product details
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    item['name'] ?? 'Unknown Product',
                    style: TextStyle(fontWeight: FontWeight.w600, fontSize: 16),
                  ),
                  SizedBox(height: 4),
                  Text(
                    'SKU: ${item['sku'] ?? 'N/A'}',
                    style: TextStyle(
                      color: CupertinoColors.systemGrey,
                      fontSize: 13,
                    ),
                  ),
                  SizedBox(height: 4),
                  Text(
                    'Qty: ${item['quantity']} × \$${item['price'].toStringAsFixed(2)}',
                    style: TextStyle(fontSize: 14),
                  ),
                  if (item['options'] != null)
                    Padding(
                      padding: const EdgeInsets.only(top: 4),
                      child: Text(
                        'Options: ${(item['options'] as Map).entries.map((e) => '${e.key}: ${e.value}').join(', ')}',
                        style: TextStyle(
                          fontSize: 13,
                          fontStyle: FontStyle.italic,
                          color: CupertinoColors.systemGrey,
                        ),
                      ),
                    ),
                ],
              ),
            ),
            // Item total
            Text(
              '\$${(item['price'] * item['quantity']).toStringAsFixed(2)}',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
          ],
        ),
      ),
    );
  }

  // Add this method to show a modal with item details
  void _showItemDetailsModal(Map<String, dynamic> item) {
    showCupertinoModalPopup(
      context: context,
      builder: (BuildContext context) {
        return Container(
          height: MediaQuery.of(context).size.height * 0.8,
          padding: EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: CupertinoColors.systemBackground,
            borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header with close button
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Product Details',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  CupertinoButton(
                    padding: EdgeInsets.zero,
                    child: Icon(
                      CupertinoIcons.xmark_circle_fill,
                      color: CupertinoColors.systemGrey,
                    ),
                    onPressed: () => Navigator.pop(context),
                  ),
                ],
              ),

              SizedBox(height: 20),

              // Product image
              Container(
                height: 200,
                width: double.infinity,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  image: DecorationImage(
                    image: NetworkImage(
                      item['image'] ?? 'https://via.placeholder.com/200',
                    ),
                    fit: BoxFit.contain,
                  ),
                ),
              ),

              SizedBox(height: 20),

              // Product name
              Text(
                item['name'] ?? 'Unknown Product',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),

              SizedBox(height: 12),

              // Divider for visual separation
              Divider(),

              // Product details in list form
              Expanded(
                child: ListView(
                  children: [
                    _buildItemDetailRow('SKU', item['sku'] ?? 'N/A'),
                    _buildItemDetailRow(
                      'Price',
                      '\$${item['price'].toStringAsFixed(2)}',
                    ),
                    _buildItemDetailRow('Quantity', '${item['quantity']}'),
                    _buildItemDetailRow(
                      'Total',
                      '\$${(item['price'] * item['quantity']).toStringAsFixed(2)}',
                    ),

                    // Options section if available
                    if (item['options'] != null) ...[
                      SizedBox(height: 16),
                      Text(
                        'Options',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 8),
                      ...(item['options'] as Map).entries
                          .map(
                            (e) => _buildItemDetailRow(
                              e.key.toString().capitalize(),
                              e.value.toString(),
                            ),
                          )
                          .toList(),
                    ],

                    // Additional information could be added here
                    SizedBox(height: 16),
                    Text(
                      'Status',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 8),
                    Container(
                      padding: EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: Color(0xFF9747FF).withOpacity(0.1),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Color(0xFF9747FF)),
                      ),
                      child: Text(
                        'In Order #${widget.order['id']}',
                        style: TextStyle(
                          color: Color(0xFF9747FF),
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  // Helper for item detail modal
  Widget _buildItemDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(fontSize: 16, color: CupertinoColors.systemGrey),
          ),
          Text(
            value,
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoSection(String title, List<Widget> children) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: CupertinoColors.white,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(left: 16, top: 16, bottom: 8),
            child: Text(
              title,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: CupertinoColors.black,
              ),
            ),
          ),
          ...children,
        ],
      ),
    );
  }

  Widget _buildInfoItem(String label, String value) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(color: CupertinoColors.systemGrey5, width: 0.5),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(color: CupertinoColors.black, fontSize: 16),
          ),
          Text(
            value,
            style: TextStyle(color: CupertinoColors.systemGrey, fontSize: 16),
          ),
        ],
      ),
    );
  }

  Widget _buildTotalItem(String label, String value) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(
              color: CupertinoColors.black,
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(
            value,
            style: TextStyle(
              color: Color(0xFF9747FF),
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMultiLineInfoItem(String text) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(16),
      child: Text(
        text,
        style: TextStyle(
          color: CupertinoColors.black,
          fontSize: 16,
          height: 1.5,
        ),
      ),
    );
  }
}
