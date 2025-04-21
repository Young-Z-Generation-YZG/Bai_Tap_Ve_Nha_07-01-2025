import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class CreatePromotionPage extends StatefulWidget {
  const CreatePromotionPage({Key? key}) : super(key: key);

  @override
  _CreatePromotionPageState createState() => _CreatePromotionPageState();
}

class _CreatePromotionPageState extends State<CreatePromotionPage> {
  // Form controllers
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _codeController = TextEditingController();
  final TextEditingController _discountController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();

  // Date range for promotion
  DateTime _startDate = DateTime.now();
  DateTime _endDate = DateTime.now().add(Duration(days: 7));

  // Selected discount type
  String _discountType = "Percentage"; // or "Fixed Amount"

  // Selected categories
  List<String> _selectedCategories = [];

  // Sample categories
  final List<Map<String, dynamic>> _categories = [
    {'id': '1', 'name': 'Casual', 'productCount': 12},
    {'id': '2', 'name': 'Formal', 'productCount': 8},
    {'id': '3', 'name': 'Maxi', 'productCount': 5},
    {'id': '4', 'name': 'Tops', 'productCount': 15},
    {'id': '5', 'name': 'Denim', 'productCount': 10},
  ];

  // Active state
  bool _isActive = true;

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Create Promotion'),
        backgroundColor: CupertinoColors.systemGroupedBackground,
        border: null,
        leading: CupertinoNavigationBarBackButton(
          onPressed: () => Navigator.pop(context),
        ),
        trailing: CupertinoButton(
          padding: EdgeInsets.zero,
          child: Text(
            'Save',
            style: TextStyle(
              color: CupertinoColors.activeBlue,
              fontWeight: FontWeight.w600,
            ),
          ),
          onPressed: _savePromotion,
        ),
      ),
      backgroundColor: CupertinoColors.systemGroupedBackground,
      child: SafeArea(
        child: ListView(
          padding: EdgeInsets.all(16.0),
          children: [
            // Basic Information Section
            _buildSectionHeader('Basic Information'),
            _buildFormCard([
              _buildFormField(
                'Promotion Name',
                _nameController,
                placeholder: 'Summer Sale 2023',
              ),
              _buildFormField(
                'Promotion Code',
                _codeController,
                placeholder: 'SUMMER23',
              ),
              // _buildDiscountSection(),
              // _buildDateRangeSelector(),
              _buildDescriptionField(),
              _buildStatusToggle(),
            ]),

            SizedBox(height: 20),

            // Categories Section
            _buildSectionHeader('Applicable Categories'),
            _buildInfoText(
              'Products in selected categories will receive this discount',
            ),
            SizedBox(height: 8),
            _buildCategoriesSelector(),

            SizedBox(height: 20),

            // Preview Section
            if (_selectedCategories.isNotEmpty) _buildPreviewSection(),

            SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(left: 4.0, bottom: 8.0),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: CupertinoColors.black,
        ),
      ),
    );
  }

  Widget _buildInfoText(String text) {
    return Padding(
      padding: const EdgeInsets.only(left: 4.0, bottom: 8.0),
      child: Text(
        text,
        style: TextStyle(fontSize: 14, color: CupertinoColors.systemGrey),
      ),
    );
  }

  Widget _buildFormCard(List<Widget> children) {
    return Container(
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
      child: Column(children: children),
    );
  }

  Widget _buildFormField(
    String label,
    TextEditingController controller, {
    String placeholder = '',
    TextInputType keyboardType = TextInputType.text,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 10.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w500,
              color: CupertinoColors.black,
            ),
          ),
          SizedBox(height: 8),
          CupertinoTextField(
            controller: controller,
            placeholder: placeholder,
            keyboardType: keyboardType,
            padding: EdgeInsets.symmetric(horizontal: 12, vertical: 12),
            decoration: BoxDecoration(
              color: CupertinoColors.systemGrey6,
              borderRadius: BorderRadius.circular(8),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDiscountSection() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 10.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Discount',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w500,
              color: CupertinoColors.black,
            ),
          ),
          SizedBox(height: 8),
          Row(
            children: [
              Expanded(
                flex: 2,
                child: CupertinoTextField(
                  controller: _discountController,
                  placeholder: '10',
                  keyboardType: TextInputType.number,
                  padding: EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                  decoration: BoxDecoration(
                    color: CupertinoColors.systemGrey6,
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
              SizedBox(width: 12),
              Expanded(
                flex: 3,
                child: Container(
                  padding: EdgeInsets.only(left: 12),
                  decoration: BoxDecoration(
                    color: CupertinoColors.systemGrey6,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: DropdownButton<String>(
                    value: _discountType,
                    isExpanded: true,
                    underline: SizedBox(),
                    items:
                        ['Percentage', 'Fixed Amount'].map((String value) {
                          return DropdownMenuItem<String>(
                            value: value,
                            child: Text(value),
                          );
                        }).toList(),
                    onChanged: (newValue) {
                      setState(() {
                        _discountType = newValue!;
                      });
                    },
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDateRangeSelector() {
    final dateFormat = (DateTime date) {
      return '${date.month}/${date.day}/${date.year}';
    };

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 10.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Valid Period',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w500,
              color: CupertinoColors.black,
            ),
          ),
          SizedBox(height: 8),
          Row(
            children: [
              Expanded(
                child: GestureDetector(
                  onTap: () => _selectDate(context, true),
                  child: Container(
                    padding: EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                    decoration: BoxDecoration(
                      color: CupertinoColors.systemGrey6,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(dateFormat(_startDate)),
                        Icon(
                          CupertinoIcons.calendar,
                          color: CupertinoColors.systemGrey,
                          size: 18,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 12),
                child: Text('to'),
              ),
              Expanded(
                child: GestureDetector(
                  onTap: () => _selectDate(context, false),
                  child: Container(
                    padding: EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                    decoration: BoxDecoration(
                      color: CupertinoColors.systemGrey6,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(dateFormat(_endDate)),
                        Icon(
                          CupertinoIcons.calendar,
                          color: CupertinoColors.systemGrey,
                          size: 18,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Future<void> _selectDate(BuildContext context, bool isStartDate) async {
    DateTime initialDate = isStartDate ? _startDate : _endDate;
    DateTime firstDate = isStartDate ? DateTime.now() : _startDate;

    await showCupertinoModalPopup(
      context: context,
      builder: (_) {
        return Container(
          height: 300,
          color: CupertinoColors.systemBackground,
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  CupertinoButton(
                    child: Text('Cancel'),
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                  CupertinoButton(
                    child: Text('Done'),
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                ],
              ),
              Expanded(
                child: CupertinoDatePicker(
                  mode: CupertinoDatePickerMode.date,
                  initialDateTime: initialDate,
                  minimumDate: isStartDate ? DateTime.now() : _startDate,
                  onDateTimeChanged: (DateTime newDate) {
                    setState(() {
                      if (isStartDate) {
                        _startDate = newDate;
                        if (_endDate.isBefore(_startDate)) {
                          _endDate = _startDate.add(Duration(days: 1));
                        }
                      } else {
                        _endDate = newDate;
                      }
                    });
                  },
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildDescriptionField() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 10.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Description',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w500,
              color: CupertinoColors.black,
            ),
          ),
          SizedBox(height: 8),
          CupertinoTextField(
            controller: _descriptionController,
            placeholder: 'Enter promotion details...',
            padding: EdgeInsets.symmetric(horizontal: 12, vertical: 12),
            decoration: BoxDecoration(
              color: CupertinoColors.systemGrey6,
              borderRadius: BorderRadius.circular(8),
            ),
            minLines: 3,
            maxLines: 5,
          ),
        ],
      ),
    );
  }

  Widget _buildStatusToggle() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 10.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'Active',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w500,
              color: CupertinoColors.black,
            ),
          ),
          CupertinoSwitch(
            value: _isActive,
            activeColor: CupertinoColors.activeBlue,
            onChanged: (bool value) {
              setState(() {
                _isActive = value;
              });
            },
          ),
        ],
      ),
    );
  }

  Widget _buildCategoriesSelector() {
    return Container(
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
        children:
            _categories.map((category) {
              final isSelected = _selectedCategories.contains(category['id']);
              return GestureDetector(
                onTap: () {
                  setState(() {
                    if (isSelected) {
                      _selectedCategories.remove(category['id']);
                    } else {
                      _selectedCategories.add(category['id']);
                    }
                  });
                },
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  decoration: BoxDecoration(
                    border: Border(
                      bottom: BorderSide(
                        color: CupertinoColors.systemGrey5,
                        width: 0.5,
                      ),
                    ),
                    color:
                        isSelected ? Color(0xFFEEE5FF) : CupertinoColors.white,
                  ),
                  child: Row(
                    children: [
                      // Category icon
                      Container(
                        width: 40,
                        height: 40,
                        decoration: BoxDecoration(
                          color:
                              isSelected
                                  ? Color(0xFF9747FF).withOpacity(0.2)
                                  : CupertinoColors.systemGrey5,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Center(
                          child: Icon(
                            CupertinoIcons.tag,
                            color:
                                isSelected
                                    ? Color(0xFF9747FF)
                                    : CupertinoColors.systemGrey,
                            size: 20,
                          ),
                        ),
                      ),
                      SizedBox(width: 12),
                      // Category details
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              category['name'],
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w500,
                                color: CupertinoColors.black,
                              ),
                            ),
                            SizedBox(height: 4),
                            Text(
                              '${category['productCount']} products',
                              style: TextStyle(
                                fontSize: 14,
                                color: CupertinoColors.systemGrey,
                              ),
                            ),
                          ],
                        ),
                      ),
                      // Checkbox
                      Container(
                        width: 24,
                        height: 24,
                        decoration: BoxDecoration(
                          color:
                              isSelected
                                  ? Color(0xFF9747FF)
                                  : CupertinoColors.white,
                          borderRadius: BorderRadius.circular(4),
                          border: Border.all(
                            color:
                                isSelected
                                    ? Color(0xFF9747FF)
                                    : CupertinoColors.systemGrey4,
                            width: 1.5,
                          ),
                        ),
                        child:
                            isSelected
                                ? Icon(
                                  CupertinoIcons.check_mark,
                                  color: CupertinoColors.white,
                                  size: 16,
                                )
                                : null,
                      ),
                    ],
                  ),
                ),
              );
            }).toList(),
      ),
    );
  }

  Widget _buildPreviewSection() {
    // Calculate number of products affected
    int totalProducts = 0;
    for (var categoryId in _selectedCategories) {
      var category = _categories.firstWhere((c) => c['id'] == categoryId);
      totalProducts += category['productCount'] as int;
    }

    // Calculate discount value for display
    String discountDisplay =
        _discountController.text.isEmpty ? '0' : _discountController.text;

    if (_discountType == 'Percentage') {
      discountDisplay = '$discountDisplay%';
    } else {
      discountDisplay = '\$$discountDisplay';
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionHeader('Promotion Preview'),
        Container(
          padding: EdgeInsets.all(16),
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
            children: [
              Row(
                children: [
                  // Icon
                  Container(
                    width: 50,
                    height: 50,
                    decoration: BoxDecoration(
                      color: Color(0xFF9747FF).withOpacity(0.2),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Center(
                      child: Icon(
                        CupertinoIcons.tag_fill,
                        color: Color(0xFF9747FF),
                        size: 24,
                      ),
                    ),
                  ),
                  SizedBox(width: 16),
                  // Details
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          _nameController.text.isEmpty
                              ? 'New Promotion'
                              : _nameController.text,
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 4),
                        Text(
                          'Code: ${_codeController.text.isEmpty ? "N/A" : _codeController.text.toUpperCase()}',
                          style: TextStyle(
                            fontSize: 14,
                            color: CupertinoColors.systemGrey,
                          ),
                        ),
                      ],
                    ),
                  ),
                  // Discount badge
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: Color(0xFF9747FF),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      discountDisplay + ' OFF',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: CupertinoColors.white,
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16),
              // Impact summary
              Container(
                padding: EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: CupertinoColors.systemGrey6,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Categories affected:',
                          style: TextStyle(
                            fontSize: 14,
                            color: CupertinoColors.systemGrey,
                          ),
                        ),
                        Text(
                          '${_selectedCategories.length}',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 8),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Products affected:',
                          style: TextStyle(
                            fontSize: 14,
                            color: CupertinoColors.systemGrey,
                          ),
                        ),
                        Text(
                          '$totalProducts',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  void _savePromotion() {
    // Validate inputs
    if (_nameController.text.isEmpty) {
      _showErrorDialog('Please enter a promotion name');
      return;
    }

    if (_codeController.text.isEmpty) {
      _showErrorDialog('Please enter a promotion code');
      return;
    }

    if (_discountController.text.isEmpty ||
        double.tryParse(_discountController.text) == null) {
      _showErrorDialog('Please enter a valid discount value');
      return;
    }

    if (_selectedCategories.isEmpty) {
      _showErrorDialog('Please select at least one category');
      return;
    }

    // Create promotion object
    final promotion = {
      'name': _nameController.text,
      'code': _codeController.text.toUpperCase(),
      'discount': double.parse(_discountController.text),
      'discountType': _discountType,
      'startDate': _startDate.toIso8601String(),
      'endDate': _endDate.toIso8601String(),
      'description': _descriptionController.text,
      'isActive': _isActive,
      'categories': _selectedCategories,
    };

    // Return to previous screen with new promotion
    Navigator.pop(context, promotion);
  }

  void _showErrorDialog(String message) {
    showCupertinoDialog(
      context: context,
      builder:
          (BuildContext context) => CupertinoAlertDialog(
            title: Text('Error'),
            content: Text(message),
            actions: [
              CupertinoDialogAction(
                child: Text('OK'),
                onPressed: () => Navigator.pop(context),
              ),
            ],
          ),
    );
  }
}
