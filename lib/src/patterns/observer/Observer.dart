part of puremvc;

/**
 * A base [IObserver] implementation.
 *
 * In PureMVC, [IObserver] implementors assume these responsibilities:
 *
 * -  Encapsulate the notification (callback) method of the interested object.
 * -  Encapsulate the notification context (this) of the interested object.
 * -  Provide methods for setting the interested object's notification method and context.
 * -  Provide a method for notifying the interested object.
 *
 * The Observer Pattern as implemented within PureMVC exists
 * to support publish/subscribe communication between actors.
 *
 * An [IObserver] is an object that encapsulates information
 * about an interested object with a notification (callback)
 * method that should be called when an [INotification] is
 * broadcast. The [IObserver] then acts as a conduit for
 * notifying the interested object.
 *
 * [IObserver]s can receive [Notification]s by having their
 * [notifyObserver] method invoked, passing in an object
 * implementing the [INotification] interface.
 *
 * See [IView], [INotification]
 */
class Observer implements IObserver {
  /**
   * This [IObserver]'s [notifyMethod] (i.e., callback)
   */
  Function? _notifyMethod;

  /**
   * This [IObserver]'s [notifyContext] (i.e., caller)
   */
  Object? _notifyContext;

  /**
   * Constructor.
   *
   * The notifyMethod method on the interested object should take
   * one parameter of type [INotification]
   *
   * Param [notifyMethod] the callback method
   * Param [notifyContext] the caller object
   */
  Observer([this._notifyMethod, this._notifyContext]) {}

  /**
   * Set the notification method.
   *
   * The notification method should take one parameter of type [INotification].
   *
   * -  Param [notifyMethod] - the notification (callback) method of the interested object.
   */
  void setNotifyMethod(Function? callback) {
    _notifyMethod = callback;
  }

  /**
   * Set the notification context.
   *
   * -  Param [caller] - a reference to the object to be notified.
   */
  void setNotifyContext(Object? caller) {
    _notifyContext = caller;
  }

  /**
   * Get the notification method.
   *
   * -  Returns [Function] - the notification (callback) method of the interested object.
   */
  Function? getNotifyMethod() => _notifyMethod;

  /**
   * Get the notification context.
   *
   * -  Returns [Object] - the caller.
   */
  Object? getNotifyContext() => _notifyContext;

  /**
   * Notify the interested object.
   *
   * -  Param [note] - the [INotification] to pass to the caller's [notifyMethod].
   */
  void notifyObserver(INotification notification) {
    if (_notifyContext != null) getNotifyMethod()!(notification);
  }

  /**
   * Compare a given object to the [notifyContext] (caller) object.
   *
   * -  Param [Object] - the object to compare.
   * -  Returns [bool] - whether the given object and the [notifyContext] (caller) are the same.
   */
  bool compareNotifyContext(Object object) {
    return identical(object, _notifyContext);
  }

  set notifyContext(Object? caller) {
    notifyContext = caller;
  }
}
