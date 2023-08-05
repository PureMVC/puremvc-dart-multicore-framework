part of puremvc;

/**
 * A base [INotification] implementation.
 *
 * The Observer Pattern as implemented within PureMVC exists
 * to support publish/subscribe communication between actors.
 *
 * [INotification]s are not meant to be a replacement for [Event]s,
 * but rather an internal communication mechanism that ensures
 * PureMVC is portable regardless of what type of Event mechanism
 * is supported (or not) on a given platform.
 *
 * Generally, [IMediator] implementors place [Event] listeners on
 * their view components, and [IProxy] implementors place [Event]
 * listeners on service components. Those [Event]s are then handled in
 * the usual way, and may lead to the broadcast of [INotification]s
 * that trigger [ICommand]s or notify [IMediator]s.
 *
 * See [IView], [IObserver], [Notification]
 */
class Notification implements INotification {
  /**
   * Constructor.
   *
   * -  Param [_name] - name of the [INotification].
   * -  Param [_body] - the [INotification] body. (optional)
   * -  Param [_type] - the type of the [INotification] (optional)
   */
  Notification(this._name, [dynamic this._body, this._type]) {}

  /**
   * Get the [name] of the [INotification].
   *
   * -  Returns [String] - the name of the [INotification].
   */
  String getName() {
    return _name;
  }

  /**
   * Set the [body] of the [INotification].
   *
   * -  Param [body] - the body of the [INotification].
   */
  void setBody(dynamic bodyObject) {
    _body = bodyObject;
  }

  /**
   * Get the [body] of the [INotification].
   *
   * -  Returns [Dynamic] - the body of the [INotification].
   */
  dynamic getBody() {
    return _body;
  }

  /**
   * Set the [type] of the [INotification].
   *
   * -  Param [type] - the type of the [INotification].
   */
  void setType(String? noteType) {
    _type = noteType;
  }

  /**
   * Get the [type] of the [INotification].
   *
   * -  Returns [String] - the type of the [INotification].
   */
  String? getType() {
    return _type;
  }

  /**
   * This [INotifications]'s [name]
   */
  final String _name;

  /**
   * This [INotifications]'s [type]
   */
  String? _type;

  /**
   * This [INotifications]'s [body]
   */
  dynamic _body;
}
