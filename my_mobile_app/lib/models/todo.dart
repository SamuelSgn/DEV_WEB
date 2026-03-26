class Todo {
  final String id;
  final String title;
  final String description;
  final String status;
  final DateTime dueTime;

  Todo({
    required this.id,
    required this.title,
    required this.description,
    required this.status,
    required this.dueTime,
  });

  factory Todo.fromJson(Map<String, dynamic> json) {
    return Todo(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      status: json['status'],
      dueTime: DateTime.parse(json['dueTime']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'description': description,
      'status': status,
      'dueTime': dueTime.toIso8601String(),
    };
  }
}
