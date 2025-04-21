import 'package:admin_flutter/domain/order.dart';
import 'package:admin_flutter/widgets/form/form-group.widget.dart';
import 'package:admin_flutter/widgets/form/input-field.widget.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class OrderDetailsV2Page extends StatefulWidget {
  final Order order;
  final int? initialScrollToItem;

  const OrderDetailsV2Page({
    Key? key,
    required this.order,
    this.initialScrollToItem,
  }) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return _OrderDetailsV2PageState();
  }
}

class _OrderDetailsV2PageState extends State<OrderDetailsV2Page> {
  late String _currentStatus;
  bool _isEditingStatus = false;

  // Scroll controller for order items
  late ScrollController _scrollController;

  // Order status options
  final List<String> _orderStatuses = [
    'PENDING',
    'CONFIRMED',
    'REQUEST_CANCEL',
    'ON_PREPARING',
    'ON_DELIVERING',
    'DELIVERED',
  ];

  @override
  void initState() {
    super.initState();
    _currentStatus = widget.order.invoiceStatus ?? 'PENDING';
    _scrollController = ScrollController();

    // If initialScrollToItem is provided, scroll to that item after layout
    if (widget.initialScrollToItem != null) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _scrollToItem(widget.initialScrollToItem!);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final totalItems = widget.order.invoiceProducts.length;
    final total = widget.order.invoiceTotal;

    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Order #${"Code"}'),
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
            _buildOrderStatusSection(),

            SizedBox(height: 16),

            FormGroup(
              title: "Customer Information",
              children: [
                InputField(
                  label: "Name",
                  disabled: true,
                  showChevron: false,
                  textController: TextEditingController(
                    text: widget.order.contactName,
                  ),
                ),
                InputField(
                  label: "Phone",
                  disabled: true,
                  showChevron: false,
                  textController: TextEditingController(
                    text: widget.order.contactPhoneNumber,
                  ),
                ),
              ],
            ),

            SizedBox(height: 16),

            FormGroup(
              title: "Shipping Information",
              children: [
                InputField(
                  label: "Address",
                  disabled: true,
                  showChevron: false,
                  textController: TextEditingController(
                    text: widget.order.shippingAddressLine,
                  ),
                ),
                InputField(
                  label: "District",
                  disabled: true,
                  showChevron: false,
                  textController: TextEditingController(
                    text: widget.order.shippingAddressDistrict,
                  ),
                ),
                InputField(
                  label: "Province",
                  disabled: true,
                  showChevron: false,
                  textController: TextEditingController(
                    text: widget.order.shippingAddressProvince,
                  ),
                ),
                InputField(
                  label: "Country",
                  disabled: true,
                  showChevron: false,
                  textController: TextEditingController(
                    text: widget.order.shippingAddressCountry,
                  ),
                ),
              ],
            ),

            SizedBox(height: 16),

            FormGroup(
              title: "Payment Information",
              children: [
                InputField(
                  label: "Payment Method",
                  disabled: true,
                  showChevron: false,
                  textController: TextEditingController(
                    text: widget.order.paymentMethod,
                  ),
                ),
              ],
            ),

            SizedBox(height: 16),

            FormGroup(
              title: "Order Summary",
              children: [
                InputField(
                  label: "Subtotal",
                  disabled: true,
                  showChevron: false,
                  textController: TextEditingController(
                    text: widget.order.invoiceTotal.toString(),
                  ),
                ),
                InputField(
                  label: "Shipping Fee",
                  disabled: true,
                  showChevron: false,
                  textController: TextEditingController(text: "\$0.00"),
                ),
                InputField(
                  label: "Discount",
                  disabled: true,
                  showChevron: false,
                  textController: TextEditingController(
                    text: widget.order.invoiceTotal.toString(),
                  ),
                ),
                InputField(
                  label: "Total",
                  labelStyle: TextStyle(
                    color: CupertinoColors.black,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                  valueStyle: TextStyle(
                    color: Color(0xFF9747FF),
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                  disabled: true,
                  showChevron: false,
                  textController: TextEditingController(
                    text: widget.order.invoiceTotal.toStringAsFixed(2),
                  ),
                ),
              ],
            ),
            SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  Widget _buildOrderStatusSection() {
    return Container(
      margin: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: CupertinoColors.white,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withAlpha(5),
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
                      // final updatedOrder = Map<String, dynamic>.from(
                      //   widget.order,
                      // );
                      // updatedOrder['status'] = _currentStatus;
                      // Navigator.pop(context, updatedOrder);

                      setState(() {
                        _isEditingStatus = !_isEditingStatus;
                      });
                    } else {
                      // Toggle edit mode
                      setState(() {
                        _isEditingStatus = !_isEditingStatus;
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
            'Last updated: ${widget.order.updatedAt ?? 'Unknown'}',
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
        color: isSelected ? color : color.withAlpha(10),
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
}
