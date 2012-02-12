/**
 * A base [INotification] implementation.
 * 
 * PureMVC does not rely upon underlying event models such 
 * as the one provided with Flash, and ActionScript 3 does 
 * not have an inherent event model.
 * 
 * The Observer Pattern as implemented within PureMVC exists 
 * to support communication between the application and the 
 * actors of the MVC triad in a platform agnostic and portable way.
 * 
 * [MVCNotification]s are not meant to be a replacement for [Event]s
 * Generally, [IMediator] implementors place event listeners on 
 * their view components, which they then handle in the usual way. 
 * This may lead to the broadcast of [MVCNotification]s to 
 * trigger [ICommand]s or to communicate with other [IMediators]. 
 * [IProxy] and [ICommand] instances communicate with each other 
 * and [IMediator]s by broadcasting [INotification]s.
 * 
 * A key difference between [Event]s and PureMVC 
 * [MVCNotification]s is that [Event]s follow the 
 * 'Chain of Responsibility' pattern, 'bubbling' up the display hierarchy 
 * until some parent component handles the [Event], while
 * PureMVC [MVCNotification]s follow a 'Publish/Subscribe'
 * pattern. PureMVC classes need not be related to each other in a 
 * parent/child relationship in order to communicate with one another
 * using [MVCNotification]s.
 * 
 * See [Observer]
 */
class MVCNotification implements INotification
{
    /**
     * Constructor. 
     * 
     * Param [noteName] - name of the [MVCNotification] instance. (required)
     * Param [bodyObject] - the [MVCNotification] body. (optional)
     * Param [noteType] - the type of the [MVCNotification] (optional)
     */
    MVCNotification( String noteName, Object bodyObject, String noteType )
    {
        name = noteName;
        body = bodyObject;
        type = noteType;
    }
    
    /**
     * Get the name of the [MVCNotification] instance.
     * 
     * Returns [String] - the name of the [MVCNotification] instance.
     */
    String getName()
    {
        return name;
    }
    
    /**
     * Set the body of the [MVCNotification] instance.
     * 
     * Param [body] - the body of the [MVCNotification] instance
     */
    void setBody( Object bodyObject )
    {
        body = bodyObject;
    }
    
    /**
     * Get the body of the [MVCNotification] instance.
     * 
     * Returns [Object] - the body of the [MVCNotification] instance. 
     */
    Object getBody()
    {
        return body;
    }
    
    /**
     * Set the type of the [MVCNotification] instance.
     * 
     * Param [type] - the type of the [MVCNotification] instance
     */
    void setType( String noteType )
    {
        type = noteType;
    }
    
    /**
     * Get the type of the [MVCNotification] instance.
     * 
     * Returns [String] - the type of the [MVCNotification] instance  
     */
    String getType()
    {
        return type;
    }

    /**
     * Get the String representation of the [MVCNotification] instance.
     * 
     * Returns [String] - a representation of the [MVCNotification] instance.
     */
    String toString()
    {
        String msg = "MVCNotification Name: "+getName();
        msg += "\nBody:"+(( body == null )?"null":body.toString());
        msg += "\nType:"+(( type == null )?"null":type);
        return msg;
    }
    
    // the name of the notification instance
    String name;
    // the type of the notification instance
    String type;
    // the body of the notification instance
    Object body;
    
}
