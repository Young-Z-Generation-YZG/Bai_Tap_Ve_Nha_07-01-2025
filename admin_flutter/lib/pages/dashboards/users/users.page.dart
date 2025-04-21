import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:admin_flutter/widgets/card-wrapper.widget.dart';

class UserPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return UserPageState();
  }
}

class UserPageState extends State<UserPage> {
  double? _deviceWidth, _deviceHeight;
  final TextEditingController _searchController = TextEditingController();

  // Sample users data
  final List<Map<String, dynamic>> users = [
    {
      'id': 'CM9801',
      'name': 'Natali Craig',
      'email': 'smith@kpmg.com',
      'address': 'Meadow Lane Oakland',
      'date': 'Just now',
      'image': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    {
      'id': 'CM9802',
      'name': 'Michael Chen',
      'email': 'chen@kpmg.com',
      'address': 'Pine Street, San Francisco',
      'date': '2 hours ago',
      'image': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    },
    // Add more users as needed
  ];

  @override
  Widget build(BuildContext context) {
    _deviceWidth = MediaQuery.of(context).size.width;
    _deviceHeight = MediaQuery.of(context).size.height;

    return Container(
      color: Color(0xFFf6f6f6),
      child: Stack(
        children: [
          SafeArea(
            bottom: false,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: EdgeInsets.only(left: 16.0, bottom: 16.0),
                  child: Text(
                    'Users',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.all(16.0),
                  child: CupertinoSearchTextField(
                    controller: _searchController,
                    placeholder: 'Search users...',
                    onChanged: (value) {
                      // Implement search functionality
                    },
                  ),
                ),
                Expanded(
                  child: ListView.builder(
                    padding: EdgeInsets.only(
                      left: 16.0,
                      right: 16.0,
                      bottom: 80.0,
                    ),
                    itemCount: users.length,
                    itemBuilder: (context, index) {
                      final user = users[index];
                      return _userCard(user);
                    },
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _userCard(Map<String, dynamic> user) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: CardWrapper(
        width: _deviceWidth! * 0.9,
        height: _deviceWidth! * 0.55,
        backgroundColor: Colors.white,
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    '#${user['id']}',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF9747FF),
                    ),
                  ),
                  Spacer(),
                  CupertinoButton(
                    padding: EdgeInsets.zero,
                    child: Icon(
                      CupertinoIcons.pencil_circle_fill,
                      color: Color(0xFF9747FF),
                      size: 22,
                    ),
                    onPressed: () => _showEditDialog(user),
                  ),
                ],
              ),
              SizedBox(height: 12),
              _infoRow('User', user['name'], user['image']),
              Divider(height: 16),
              _infoRow('Email', user['email']),
              Divider(height: 16),
              _infoRow('Address', user['address']),
              Divider(height: 16),
              _infoRow('Date', user['date']),
            ],
          ),
        ),
      ),
    );
  }

  Widget _infoRow(String label, String value, [String? imageUrl]) {
    return Row(
      children: [
        SizedBox(
          width: 70,
          child: Text(
            label,
            style: TextStyle(color: Colors.grey, fontSize: 13),
          ),
        ),
        if (imageUrl != null) ...[
          Container(
            width: 28,
            height: 28,
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
            style: TextStyle(fontSize: 14, color: Colors.black87),
          ),
        ),
      ],
    );
  }

  void _showEditDialog(Map<String, dynamic> user) {
    final nameController = TextEditingController(text: user['name']);
    final emailController = TextEditingController(text: user['email']);
    final addressController = TextEditingController(text: user['address']);

    showCupertinoModalPopup(
      context: context,
      builder:
          (BuildContext context) => Container(
            height: 400,
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: CupertinoColors.systemBackground,
              borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Edit User',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 20),
                CupertinoTextField(
                  controller: nameController,
                  placeholder: 'Name',
                  padding: EdgeInsets.all(12),
                ),
                SizedBox(height: 12),
                CupertinoTextField(
                  controller: emailController,
                  placeholder: 'Email',
                  keyboardType: TextInputType.emailAddress,
                  padding: EdgeInsets.all(12),
                ),
                SizedBox(height: 12),
                CupertinoTextField(
                  controller: addressController,
                  placeholder: 'Address',
                  padding: EdgeInsets.all(12),
                ),
                SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    CupertinoButton(
                      child: Text('Cancel'),
                      onPressed: () => Navigator.pop(context),
                    ),
                    CupertinoButton.filled(
                      child: Text('Save'),
                      onPressed: () {
                        setState(() {
                          user['name'] = nameController.text;
                          user['email'] = emailController.text;
                          user['address'] = addressController.text;
                        });
                        Navigator.pop(context);
                      },
                    ),
                  ],
                ),
              ],
            ),
          ),
    );
  }

  Widget _buildActionButton(IconData icon, {required VoidCallback onPressed}) {
    return CupertinoButton(
      padding: EdgeInsets.zero,
      child: Icon(icon, size: 24, color: CupertinoColors.black),
      onPressed: onPressed,
    );
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }
}
