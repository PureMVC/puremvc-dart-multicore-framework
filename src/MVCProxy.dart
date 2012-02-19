/**
 * A base <code>IProxy</code> implementation. 
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
class MVCProxy extends MVCNotifier implements IProxy
{
    /**
     * Constructor
     * 
     * Param [name] - the name this IProxy will be registered with
     * Param [data] - the data object (optional)
     */
    MVCProxy( String this.name, [Dynamic this.data] ){ }

    /**
     * Get the [IProxy] name
     * 
     * Returns [String] - the [IProxy] instance name
     */
    String getName()
    {
        return name;
    }        
    
    /**
     * Set the data object
     * 
     * Param [dataObject] - the data object
     */
    void setData( Dynamic dataObject )
    {
       data = dataObject;
    }
    
    /**
     * Get the data object
     * 
     * Returns [Dynamic] - the data object
     */
    Dynamic getData() 
    {
        return data;
    }        
    
    /**
     * Called by the [IModel] when the [IProxy] is registered
     */ 
    void onRegister(){}

    /**
     * Called by the [IModel] when the [IProxy] is removed
     */ 
    void onRemove(){}
    
    // the proxy name
    String name;
    
    // the data object
    Dynamic data;
    
}
