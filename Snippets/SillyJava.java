public abstract class AbstractSingletonProxyFactoryBean extends ProxyConfig
		implements FactoryBean, BeanClassLoaderAware, InitializingBean {

	private Object target;

	private Class[] proxyInterfaces;

	private Object[] preInterceptors;

	private Object[] postInterceptors;
}