part of puremvc;

/**
 * A PureMVC MultiCore [IModel] implementation.
 *
 * In PureMVC, [IModel] implementors provide
 * access to [IProxy] objects by named lookup.
 *
 * An [IModel] assumes these responsibilities:
 *
 * -  Maintain a cache of [IProxy] instances.
 * -  Provide methods for registering, retrieving, and removing [IProxy] instances.
 *
 * Your application must register [IProxy] instances
 * with the [IModel]. Typically, you use an
 * [ICommand] to create and register [IProxy]
 * instances once the [IFacade] has initialized the core
 * actors.
 *
 * See [IProxy], [IFacade]
 */
class Model implements IModel {
  /**
   * Constructor.
   *
   * This [IModel] implementation is a Multiton, so you should not call the constructor directly,
   * but instead call the static [getInstance] method.
   *
   * -  Throws [MultitonErrorModelExists] if instance for this Multiton key instance has already been constructed.
   */
  Model(String key) {
    if (instanceMap.containsKey(key)) throw MultitonErrorModelExists();
    multitonKey = key;
    instanceMap[multitonKey] = this;
    proxyMap = Map<String, IProxy>();
    initializeModel();
  }

  /**
   * Initialize the [IModel] instance.
   *
   * Called automatically by the constructor, this is your opportunity to initialize the Singleton
   * instance in your subclass without overriding the constructor.
   */
  void initializeModel() {}

  /**
   * [IModel] Multiton Factory method.
   *
   * -  Returns the [IModel] Multiton instance for the specified key.
   */
  static IModel? getInstance(String? key) {
    if (key == null || key == "") return null;
    if (instanceMap.containsKey(key)) {
      return instanceMap[key];
    } else {
      return instanceMap[key] = Model(key);
    }
  }

  /**
   * Register an [IProxy] instance with the [IModel].
   *
   * -  Param [proxy] - an object reference to be held by the [IModel].
   */
  void registerProxy(IProxy proxy) {
    proxy.initializeNotifier(multitonKey);
    proxyMap[proxy.getName()] = proxy;
    proxy.onRegister();
  }

  /**
   * Retrieve an [IProxy] instance from the [IModel].
   *
   * -  Param [proxyName] - the name of the [IProxy] instance to retrieve.
   * -  Returns the [IProxy] instance previously registered with the given [proxyName].
   */
  IProxy retrieveProxy(String proxyName) {
    return proxyMap[proxyName]!;
  }

  /**
   * Remove an [IProxy] instance from the [IModel].
   *
   * -  Param [proxyName] - name of the [IProxy] instance to be removed.
   * -  Returns [IProxy] - the [IProxy] that was removed from the [IModel].
   */
  IProxy removeProxy(String proxyName) {
    IProxy proxy = proxyMap[proxyName]!;
    proxyMap.remove(proxyName);
    proxy.onRemove();
    return proxy;
  }

  /**
   * Check if an [IProxy] is registered with the [IModel].
   *
   * -  Param [proxyName] - the name of the [IProxy] instance you're looking for.
   * -  Returns [bool] - whether an [IProxy] is currently registered with the given [proxyName].
   */
  bool hasProxy(String proxyName) {
    return proxyMap.containsKey(proxyName);
  }

  /**
   * Remove an [IModel] instance.
   *
   * -  Param [key] - the multitonKey of [IModel] instance to remove
   */
  static void removeModel(String key) {
    instanceMap.remove(key);
  }

  // Mapping of proxyNames to IProxy instances
  late Map<String, IProxy> proxyMap;

  // Multiton instance map
  static Map<String, IModel> instanceMap = Map<String, IModel>();

  // The Multiton Key for this Core
  late String _multitonKey;
  String get multitonKey => _multitonKey;
  void set multitonKey(String value) => _multitonKey = value;
}

class MultitonErrorModelExists {
  const MultitonErrorModelExists();

  String toString() {
    return "IModel Multiton instance already constructed for this key.";
  }
}
