/**
 * The interface definition for a PureMVC [View].
 * 
 * In PureMVC, [IView] implementors assume these responsibilities:
 * 
 * In PureMVC, the [View] class assumes these responsibilities:
 * - Maintain a cache of [IMediator] instances.
 * - Provide methods for registering, retrieving, and removing [IMediators].
 * - Managing the observer lists for each [INotification] in the application.
 * - Providing a method for attaching [IObservers] to an [INotification]'s observer list.
 * - Providing a method for broadcasting an [INotification].
 * - Notifying the [IObservers] of a given [INotification] when it broadcast.
 * 
 * See [IMediator], [IObserver], [INotification]
 */
interface IView 
{
  /**
   * Register an [IObserver] to be notified
   * of [INotifications] with a given name.
   * 
   * Param [noteName] - the name of the [INotifications] to notify this [IObserver] of
   * Param [observer] - the [IObserver] to register
   */
  void registerObserver( String noteName, IObserver observer);

  /**
   * Remove an [IObserver] from the observer list for a given [Notification] name.
   * 
   * Param [notificationName] - which observer list to remove from 
   * Param [notifyContext] - remove the observers with this object as their notifyContext
   */
  void removeObserver( String notificationName, Object notifyContext );

  /**
   * Notify the [IObservers] for a particular [INotification].
   * 
   * All previously attached [IObservers] for this [INotification]'s
   * list are notified and are passed a reference to the [INotification] in 
   * the order in which they were registered.
   * 
   * Param [note] - the [INotification] to notify [IObservers] of.
   */
  void notifyObservers( INotification note );

  /**
   * Register an [IMediator] instance with the [View].
   * 
   * Registers the [IMediator] so that it can be retrieved by name,
   * and further interrogates the [IMediator] for its 
   * [INotification] interests.
   * 
   * If the [IMediator] returns any [INotification] 
   * names to be notified about, an [Observer] is created encapsulating 
   * the [IMediator] instance's [handleNotification] method 
   * and registering it as an [Observer] for all [INotifications] the 
   * [IMediator] is interested in.
   * 
   * Param [mediatorName] - the name to associate with this [IMediator] instance
   * Param [mediator] - a reference to the [IMediator] instance
   */
  void registerMediator( IMediator mediator );

  /**
   * Retrieve an [IMediator] from the [View].
   * 
   * Param [mediatorName] - the name of the [IMediator] instance to retrieve.
   * Returns the [IMediator] instance previously registered in this core with the given [mediatorName].
   */
  IMediator retrieveMediator( String mediatorName );

  /**
   * Remove an [IMediator] from the [View].
   * 
   * Param [mediatorName] - name of the [IMediator] instance to be removed.
   * Returns the [IMediator] that was removed from this core's [IView]
   */
  IMediator removeMediator( String mediatorName );
  
  /**
   * Check if a [Mediator] is registered or not
   * 
   * Param [mediatorName]
   * Returns [bool] - whether a [Mediator] is registered in this core with the given [mediatorName].
   */
  bool hasMediator( String mediatorName );

  /**
   * This IView's Multiton Key
   */
  void set multitonKey( String key );
  String get multitonKey();
  
}

