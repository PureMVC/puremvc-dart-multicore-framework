/**
 * A Multiton [IModel] implementation.
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
class MVCModel implements IModel
{
  /**
   * Constructor. 
   * 
   * This [IModel] implementation is a Multiton, 
   * so you should not call the constructor 
   * directly, but instead call the static Multiton 
   * [getInstance] method 
   * 
   * Throws [ModelExistsError] if instance for this Multiton key instance has already been constructed
   * 
   */
  MVCModel( String key )
  {      
    if ( instanceMap[ key ] != null ) throw new ModelExistsError();
    multitonKey = key;
    instanceMap[ multitonKey ] = this;
    proxyMap = new Map<String,IProxy>();    
    initializeModel();    
  }
    
  /**
   * Initialize the [Model] instance.
   * 
   * <P>
   * Called automatically by the constructor, this
   * is your opportunity to initialize the Singleton
   * instance in your subclass without overriding the
   * constructor.</P>
   * 
   * @return void
   */
  void initializeModel(  ){ }
          
  /**
   * <code>Model</code> Multiton Factory method.
   * 
   * @return the instance for this Multiton key 
   */
  static IModel getInstance( String key ) 
  {
    if ( instanceMap == null ) instanceMap = new Map<String,IModel>();
    if ( instanceMap[ key ] == null ) instanceMap[ key ] = new MVCModel( key );
    return instanceMap[ key ];
  }

  /**
   * Register an [IProxy] instance with the [IModel].
   * 
   * Param [proxyName] - the name to associate with this [IProxy] instance.
   * Param [proxy] - an object reference to be held by the [IModel].
   */
  void registerProxy( IProxy proxy )
  {
    proxy.initializeNotifier( multitonKey );
    proxyMap[ proxy.getName() ] = proxy;
    proxy.onRegister();
  }

  /**
   * Retrieve an [IProxy] instance from the [Model].
   * 
   * Param [proxyName] - the name of the [Proxy] instance to retrieve
   * Returns the [IProxy] instance previously registered with the given [proxyName].
   */
  IProxy retrieveProxy( String proxyName )
  {
    return proxyMap[ proxyName ];
  }

  /**
   * Remove an [IProxy] instance from the Model.
   * 
   * Param [proxyName] - name of the [IProxy] instance to be removed.
   * Returns the [IProxy] that was removed from the [Model]
   */
  IProxy removeProxy( String proxyName )
  {
    IProxy proxy = proxyMap[ proxyName ];
    if ( proxy != null ) 
    {
      proxyMap[ proxyName ] = null;
      proxy.onRemove();
    }
    return proxy;
  }

  /**
   * Check if an [IProxy] is registered
   * 
   * Param [proxyName] - the name of the [Proxy] instance to be removed.
   * Returns whether a [Proxy] is currently registered with the given [proxyName].
   */
  bool hasProxy( String proxyName )
  {
    return proxyMap[ proxyName ] != null;
  }

  /**
   * Remove an [IModel] instance
   * 
   * Param [key] - the multitonKey of [IModel] instance to remove
   */
  static void removeModel( String key )
  {
    instanceMap[ key ] = null;
  }

  // Mapping of proxyNames to IProxy instances
  Map<String,IProxy> proxyMap;

  // Multiton instance map
  static Map<String,IModel> instanceMap;
  
  // The Multiton Key for this Core
  String multitonKey;
}

class ModelExistsError {
  const ModelExistsError();

  String toString() {
    return "Model instance for this Multiton key already constructed!";
  }
}
