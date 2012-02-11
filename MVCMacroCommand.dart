/**
 * A base [ICommand] implementation that synchronously executes other [ICommand]s.
 *  
 * A [MVCMacroCommand] maintains an list of [ICommand] Class constructor references called 'SubCommands'.
 * 
 * When [execute] is called, the [MVCMacroCommand] 
 * instantiates and calls [execute] on each of its 'SubCommands' turn.
 * Each 'SubCommand' will be passed a reference to the original
 * [INotification] that was passed to the [MVCMacroCommand]'s 
 * [execute] method.
 * 
 * Unlike [MVCSimpleCommand], your subclass
 * should not override [execute], but instead, should 
 * override the [initializeMacroCommand] method, 
 * calling [addSubCommand] once for each 'SubCommand'
 * to be executed.
 * 
 * See [ICommand], [IController], [INotification], [SimpleCommand], [INotifier]
 */
class MVCMacroCommand extends MVCNotifier implements ICommand
{
    
  /**
   * Constructor. 
   * 
   * You should not need to define a constructor, 
   * instead, override the [initializeMacroCommand]
   * method.
   * 
   * If your subclass does define a constructor, be 
   * sure to call [super()].
   */
  MVCMacroCommand()
  {
    subCommands = new List<Function>();
    initializeMacroCommand();            
  }
  
  /**
   * Initialize the [MacroCommand].
   * 
   * In your subclass, override this method to 
   * initialize the [MacroCommand]'s 'SubCommand'  
   * list with [ICommand] class references by calling 
   * [addSubCommand].
   * 
   * Note that 'SubCommand's may be any [ICommand] implementor,
   * [MacroCommand]s or [SimpleCommands] are both acceptable.
   */
  void initializeMacroCommand(){}
  
  /**
   * Add a 'SubCommand'.
   * 
   * 
   * The 'SubCommand' will be called in First In/First Out (FIFO)
   * order.
   * 
   * Param [commandClassRef] - a reference to the Class constructor of the [ICommand].
   */
  void addSubCommand( Function commandClassRef )
  {
      subCommands.add(commandClassRef);
  }
  
  /** 
   * Execute this [MacroCommand]'s <i>SubCommands</i>.
   * 
   * 
   * The <i>SubCommands</i> will be called in First In/First Out (FIFO)
   * order. 
   * 
   * @param notification the [INotification] object to be passsed to each <i>SubCommand</i>.
   */
  /**
   * Execute this [MacroCommand]'s 'SubCommands'.
   * 
   * The SubCommands will be called in First In/First Out (FIFO)
   * order. 
   * 
   * Param [note] - an [INotification] object to be passsed to each 'SubCommand'.
   */
  void execute( INotification note )
  {
      for ( Function commandClassRef in subCommands ) {
          ICommand commandInstance = commandClassRef();
          commandInstance.initializeNotifier( multitonKey );
          commandInstance.execute( note );
      }
  }                            

  List<Function> subCommands;  
}
