import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:admin_flutter/widgets/card-wrapper.widget.dart';
import 'package:provider/provider.dart';
import 'package:admin_flutter/providers/ui_provider.dart';

class InvoicePage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return InvoicePageState();
  }
}

class InvoicePageState extends State<InvoicePage> {
  double? _deviceWidth, _deviceHeight;
  final TextEditingController _searchController = TextEditingController();

  // Sample invoices data
  final List<Map<String, dynamic>> invoices = [
    {
      'id': 'CM9801',
      'user': 'Natali Craig',
      'project': 'Landing Page',
      'address': 'Meadow Lane Oakland',
      'date': 'Just now',
      'status': 'In Progress',
      'image': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    {
      'id': 'CM9802',
      'user': 'Michael Chen',
      'project': 'E-commerce Site',
      'address': 'Pine Street, San Francisco',
      'date': '2 hours ago',
      'status': 'Completed',
      'image': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    },
    {
      'id': 'CM9803',
      'user': 'Emily Johnson',
      'project': 'Mobile App',
      'address': 'Oakwood Drive, Austin',
      'date': 'Yesterday',
      'status': 'Pending',
      'image': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    },
    {
      'id': 'CM9804',
      'user': 'David Wilson',
      'project': 'Blog Redesign',
      'address': 'Maple Avenue, Chicago',
      'date': 'Jan 10, 2024',
      'status': 'Completed',
      'image': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    },
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
            Padding(
              padding: EdgeInsets.only(left: 16.0, top: 8.0, bottom: 16.0),
              child: Text(
                'Order List',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
              child: CupertinoSearchTextField(
                controller: _searchController,
                placeholder: 'Search orders...',
                onChanged: (value) {
                  // Implement search functionality
                },
              ),
            ),
            Expanded(
              child: ListView.builder(
                padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                itemCount: invoices.length,
                itemBuilder: (context, index) {
                  final invoice = invoices[index];
                  return _invoiceCard(invoice);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _invoiceCard(Map<String, dynamic> invoice) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: CardWrapper(
        width: _deviceWidth! * 0.9,
        height: _deviceWidth! * 0.65,
        backgroundColor: Colors.white,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    '#${invoice['id']}',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
                  ),
                  _statusBadge(invoice['status']),
                ],
              ),
              SizedBox(height: 16),
              _infoRow('User', invoice['user'], invoice['image']),
              Divider(height: 24),
              _infoRow('Project', invoice['project']),
              Divider(height: 24),
              _infoRow('Address', invoice['address']),
              Divider(height: 24),
              _infoRow('Date', invoice['date']),
            ],
          ),
        ),
      ),
    );
  }

  Widget _statusBadge(String status) {
    Color backgroundColor;
    Color textColor = Colors.white;

    switch (status) {
      case 'In Progress':
        backgroundColor = Color(0xFFB086FF).withOpacity(0.2);
        textColor = Color(0xFFB086FF);
        break;
      case 'Completed':
        backgroundColor = Color(0xFF4CAF50).withOpacity(0.2);
        textColor = Color(0xFF4CAF50);
        break;
      case 'Pending':
        backgroundColor = Color(0xFFFFC107).withOpacity(0.2);
        textColor = Color(0xFFFFC107);
        break;
      default:
        backgroundColor = Colors.grey.withOpacity(0.2);
        textColor = Colors.grey;
    }

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        status,
        style: TextStyle(
          color: textColor,
          fontWeight: FontWeight.bold,
          fontSize: 14,
        ),
      ),
    );
  }

  Widget _infoRow(String label, String value, [String? imageUrl]) {
    return Row(
      children: [
        SizedBox(
          width: 80,
          child: Text(
            label,
            style: TextStyle(color: Colors.grey, fontSize: 14),
          ),
        ),
        if (imageUrl != null) ...[
          Container(
            width: 32,
            height: 32,
            margin: EdgeInsets.only(right: 8),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              image: DecorationImage(
                image: NetworkImage(imageUrl),
                fit: BoxFit.cover,
              ),
            ),
          ),
        ],
        Expanded(
          child: Text(
            value,
            style: TextStyle(fontSize: 16, color: Colors.black87),
          ),
        ),
      ],
    );
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }
}
