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
    Function notify;
    Object context;

    /**
     * Constructor. 
     * 
     * The notifyMethod method on the interested object should take 
     * one parameter of type [INotification]
     * 
     * Param [notifyMethod] the notification method 
     * Param [notifyContext] the notification context of the interested object (keeps the context object alive if the function reference alone doesn't) 
     */
    MVCObserver( Function notifyMethod, [Object notifyContext] ) 
    {
        setNotifyMethod( notifyMethod );
        if ( notifyContext != null ) setNotifyContext( notifyContext );
    }
    
    /**
     * Set the notification method.
     * 
     * The notification method should take one parameter of type [INotification]
     * 
     * Param [notifyMethod] - the notification (callback) method of the interested object
     */
    void setNotifyMethod( Function notifyMethod )
    {
        notify = notifyMethod;
    }
    
    /**
     * Set the notification context.
     * 
     * Param [notifyContext] - the notification context (this) of the interested object
     */
    void setNotifyContext( Object notifyContext )
    {
        context = notifyContext;
    }
    
    /**
     * Get the notification method.
     * 
     * Returns [Function] the notification (callback) method of the interested object.
     */
    Function getNotifyMethod()
    {
        return notify;
    }
    
    /**
     * Get the notification context.
     * 
     * Returns [Object] the notification context ([this]) of the interested object.
     */
    Object getNotifyContext()
    {
        return context;
    }
    
    /**
     * Notify the interested object.
     * 
     * Param [notification] the [INotification] to pass to the interested object's notification method
     */
    void notifyObserver( INotification notification )
    {
      if ( notify != null ) getNotifyMethod()(notification);  
    }

    /**
     * Compare the given object to the notificaiton context object.
     * 
     * Param [object] the object to compare.
     * Returns [bool] indicating if the notification context and the object are the same.
     */
    bool compareNotifyContext( Object object )
    {
         return object === context;
    }        
}
