/**
 * The interface definition for a PureMVC [MVCNotification].
 *
 * PureMVC does not rely upon underlying event models such 
 * as the one provided with Flash, and ActionScript 3 does 
 * not have an inherent event model.
 * 
 * The Observer Pattern as implemented within PureMVC exists 
 * to support event-driven communication between the 
 * application and the actors of the MVC triad.
 * 
 * [MVCNotification]s are not meant to be a replacement for Events
 * Generally, [IMediator] implementors
 * place event listeners on their view components, which they
 * then handle in the usual way. This may lead to the broadcast of [MVCNotification]s to 
 * trigger [ICommand]s or to communicate with other [IMediators]. [IProxy] and [ICommand]
 * instances communicate with each other and [IMediator]s 
 * by broadcasting [INotification]s.
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
 * See [IView], [IObserver], [MVCNotification] 
 */
interface INotification
{
    
    /**
     * Get the name of the [INotification] instance. 
     * No setter, should be set by constructor only
     */
    String getName();

    /**
     * Set the body of the [INotification] instance
     * 
     * Param [body] - the body of the [INotification]
     */
    void setBody( Object body );
    
    /**
     * Get the body of the [INotification] instance     
     * 
     * Returns [Object] - the body of the [INotification]
     */
    Object getBody();
    
    /**
     * Set the type of the [INotification] instance
     * 
     * Param [type] - the type of the [INotification]
     */
    void setType( String type );
    
    /**
     * Get the type of the [INotification] instance
     * 
     * Returns [String] - the type of the [INotification]
     */
    String getType();

    /**
     * Get the string representation of the [INotification] instance
     * 
     * Returns [String] - the name, body and type of the [INotification]
     */
    String toString();
}
