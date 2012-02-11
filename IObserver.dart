/**
 * The interface definition for a PureMVC Observer.
 *
 * In PureMVC, [IObserver] implementors assume these responsibilities:
 * - Encapsulate the notification (callback) method of the interested object.
 * - Encapsulate the notification context (this) of the interested object.
 * - Provide methods for setting the interested object' notification method and context.
 * - Provide a method for notifying the interested object.
 * 
 * The Observer Pattern as implemented within
 * PureMVC exists to support communication
 * between the application and the actors of the
 * MVC triad.
 * 
 * An [IObserver] is an object that encapsulates information
 * about an interested object with a notification method that
 * should be called when an [INotification] is broadcast. The [IObserver] then
 * acts as a conduit for notifying the interested object.
 * 
 * [IObserver]s can receive [Notification]s by having their
 * [notifyObserver] method invoked, passing
 * in an object implementing the [INotification] interface, such
 * as a subclass of [Notification].
 * 
 * See [IView], [INotification]
 */
interface IObserver
{
    /**
     * Set the notification method.
     * 
     * The notification method should take one parameter of type [INotification]
     * 
     * Param [notifyMethod] the notification (callback) method of the interested object
     */
    void setNotifyMethod( Function notifyMethod );
    
    /**
     * Set the notification context.
     * 
     * Param [notifyContext] the notification context (this) of the interested object
     */
    void setNotifyContext( Object notifyContext );
    
    /**
     * Get the notification method.
     * 
     * Returns [Function] the notification (callback) method of the interested object.
     */
    Function getNotifyMethod();
    
    /**
     * Get the notification context.
     * 
     * Returns [Object] the notification context ([this]) of the interested object.
     */
    Object getNotifyContext();
    
    /**
     * Compare the given object to the notificaiton context object.
     * 
     * Param [object] the object to compare.
     * Returns [bool] indicating if the notification context and the object are the same.
     */
    bool compareNotifyContext( Object object );
    
    /**
     * Notify the interested object.
     * 
     * Param [notification] the [INotification] to pass to the interested object's notification method
     */
    void notifyObserver( INotification notification );
    
}

