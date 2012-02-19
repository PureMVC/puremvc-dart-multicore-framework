/**
 * The interface definition for a PureMVC [MVCModel].
 * 
 * In PureMVC, [IModel] implementors provide
 * access to [IProxy] objects by named lookup.
 * 
 * An [IModel] assumes these responsibilities:
 * - Maintain a cache of [IProxy] instances
 * - Provide methods for registering, retrieving, and removing [IProxy] instances
 * 
 * Your application must register [IProxy] instances 
 * with the [IModel]. Typically, you use an 
 * [ICommand] to create and register [IProxy] 
 * instances once the [IFacade] has initialized the core 
 * actors.
 *
 * See [IProxy], [IFacade]
 */
interface IModel
{
    /**
     * Register an [IProxy] instance with the [IModel].
     * 
     * Param [proxyName] - the name to associate with this [IProxy] instance.
     * Param [proxy] - an object reference to be held by the [IModel].
     */
    void registerProxy( IProxy proxy );

    /**
     * Retrieve an [IProxy] instance from the [Model].
     * 
     * Param [proxyName] - the name of the [Proxy] instance to retrieve
     * Returns the [IProxy] instance previously registered with the given [proxyName].
     */
    IProxy retrieveProxy( String proxyName );

    /**
     * Remove an [IProxy] instance from the Model.
     * 
     * Param [proxyName] - name of the [IProxy] instance to be removed.
     * Returns the [IProxy] that was removed from the [Model]
     */
    IProxy removeProxy( String proxyName );

    /**
     * Check if an [IProxy] is registered
     * 
     * Param [proxyName] - the name of the [Proxy] instance to be removed.
     * Returns whether a [Proxy] is currently registered with the given [proxyName].
     */
    bool hasProxy( String proxyName );

    /**
     * This IModel's Multiton Key
     */
    void set multitonKey( String key );
    String get multitonKey();
    
}
