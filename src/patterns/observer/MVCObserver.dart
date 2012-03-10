/**
 * A base [IObserver] implementation.
 * 
 * In PureMVC, [IObserver] implementors assume these responsibilities:
 * - Encapsulate the notification (callback) method of the interested object.
 * - Encapsulate the notification context (this) of the interested object.
 * - Provide methods for setting the interested object' notification method and context.
 * - Provide a method for notifying the interested object.
 * 
 * The Observer Pattern as implemented within
 * PureMVC exists to support portable communication
 * between the application and the actors of the
 * MVC triad.
 * 
 * An [Observer] is an object that encapsulates information
 * about an interested object with a notification method that
 * should be called when an [INotification] is broadcast. The [Observer] then
 * acts as a proxy for notifying the interested object.
 * 
 * [Observer]s can receive [INotification]s by having their
 * [notifyObserver] method invoked, passing
 * in an object implementing the [INotification] interface, such
 * as a subclass of [MVCNotification].
 * 
 * See [MVCView], [MVCNotification]
 */
class MVCObserver implements IObserver
{

  /**
   * This IObserver's notify method (i.e., callback)
   */
  Function notifyMethod;
  
  /**
   * This IObserver's notify context (i.e., caller)
   */
  Object notifyContext;

  /**
   * Constructor. 
   * 
   * The notifyMethod method on the interested object should take 
   * one parameter of type [INotification]
   * 
   * Param [notifyMethod] the callback method 
   * Param [notifyContext] the caller object 
   */
  MVCObserver( Function this.notifyMethod, [Object this.notifyContext] ){}
  
  /**
   * Set the notification method.
   * 
   * The notification method should take one parameter of type [INotification]
   * 
   * Param [callback] - the method to call back when notifying the Observer
   */
  void setNotifyMethod( Function callback )
  {
    notifyMethod = callback;
  }
  
  /**
   * Set the notification context.
   * 
   * Param [caller] - the caller object
   */
  void setNotifyContext( Object caller )
  {
    notifyContext = caller;
  }
  
  /**
   * Get the notification method.
   * 
   * Returns [Function] the callback method
   */
  Function getNotifyMethod()
  {
    return notifyMethod;
  }
  
  /**
   * Get the notification context.
   * 
   * Returns [Object] the caller
   */
  Object getNotifyContext()
  {
      return notifyContext;
  }
  
  /**
   * Notify the interested object.
   * 
   * Param [notification] the [INotification] to pass to the caller's callback method
   */
  void notifyObserver( INotification notification )
  {
    if ( notifyContext != null ) getNotifyMethod()( notification );  
  }

  /**
   * Compare the given object to the notificaiton context object.
   * 
   * Param [object] the object to compare.
   * Returns [bool] indicating if the caller and the object are the same.
   */
  bool compareNotifyContext( Object object )
  {
       return object === notifyContext;
  }        
}
