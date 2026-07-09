import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          padding: '40px',
          maxWidth: '800px',
          margin: '80px auto',
          fontFamily: 'monospace',
          background: '#fff5f5',
          border: '1px solid #feb2b2',
          borderRadius: '12px',
        }}>
          <h2 style={{ color: '#c53030', marginBottom: '16px' }}>
            Component Crashed: {this.props.name || 'Unknown'}
          </h2>
          <pre style={{
            background: '#1a202c',
            color: '#feb2b2',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '13px',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {this.state.error?.toString()}
            {'\n\n'}
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => this.setState({ error: null, errorInfo: null })}
            style={{
              marginTop: '16px',
              padding: '8px 24px',
              background: '#10B981',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
