/**
 * The interface definition for a PureMVC [MVCProxy].
 *
 * In PureMVC, [IProxy] implementors assume these responsibilities:
 * - Implement a common method which returns the name of the [IProxy].
 * - Provide methods for setting and getting the data object.
 *
 * Additionally, [IProxy]s typically:
 * - Maintain references to one or more pieces of model data.
 * - Provide methods for manipulating that data.
 * - Generate [INotifications] when their model data changes.
 * - Expose their name as a [public static const] called [NAME], if they are not instantiated multiple times.
 * - Encapsulate interaction with local or remote services used to fetch and persist model data.
 *
 * See [IModel], [INotifier]
 */
interface IProxy extends INotifier
{
    /**
     * Get the [IProxy] name
     * 
     * Returns the [IProxy] instance name
     */
    String getName();
    
    /**
     * Set the data object
     * 
     * Param [data] - the data object
     */
    void setData( Dynamic dataObject );
    
    /**
     * Get the data object
     * 
     * Returns [Dynamic] - the data object
     */
    Dynamic getData(); 
    
    /**
     * Called by the [IModel] when the [IProxy] is registered
     */ 
    void onRegister( );

    /**
     * Called by the [IModel] when the [IProxy] is removed
     */ 
    void onRemove( );
    
    /**
     * This IProxy's data
     */
    void set data( Dynamic dataObject );
    Dynamic get data();
    
    /**
     * This IProxy's name
     */
    void set name( String proxyName );
    String get name();
    
    
}
